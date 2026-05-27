#!/usr/bin/env node
/**
 * postbuild.mjs — Vercel Build Output API v3 packager for TanStack Start.
 *
 * Strategy:
 *  1. esbuild bundles dist/server/server.js + ALL its dependencies into one CJS file: _server_bundle.js
 *  2. We write a thin index.js that requires _server_bundle.js and bridges Node.js ↔ Fetch API
 *  3. Both files go into .vercel/output/functions/index.func/
 *  4. Vercel's nodejs20.x runtime runs index.js with module.exports as the handler
 */

import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
  rmSync,
} from "fs";
import { join } from "path";
import { execFileSync } from "child_process";

const ROOT   = process.cwd();
const OUT    = join(ROOT, ".vercel/output");
const STATIC = join(OUT, "static");
const FUNC   = join(OUT, "functions/index.func");

// ── helpers ───────────────────────────────────────────────────────────────────
function mkdirs(...dirs) {
  dirs.forEach((d) => mkdirSync(d, { recursive: true }));
}
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    statSync(s).isDirectory() ? copyDir(s, d) : copyFileSync(s, d);
  }
}

// ── 1. Scaffold — wipe and recreate clean dirs each run ──────────────────────
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirs(STATIC, FUNC);
console.log("📁  Scaffolded .vercel/output/");

// ── 2. Copy client static assets ─────────────────────────────────────────────
copyDir(join(ROOT, "dist/client/assets"), join(STATIC, "assets"));
console.log("📦  Client assets → .vercel/output/static/assets/");

// ── 3. Bundle the SSR server with esbuild ────────────────────────────────────
// We bundle dist/server/server.js on its own (as a library, --format=cjs).
// esbuild will inline ALL dependencies: react, firebase, h3-v2, seroval, etc.
// The result is _server_bundle.js with module.exports = { default: server, ... }
const serverBundlePath = join(FUNC, "_server_bundle.js");
const esbuildBin       = join(ROOT, "node_modules/.bin/esbuild");

console.log("🔧  Bundling SSR server with esbuild (all deps inlined)...");
execFileSync(
  esbuildBin,
  [
    "dist/server/server.js",       // Entry: the TanStack Start SSR server
    "--bundle",                    // Inline all imports from node_modules
    "--platform=node",             // Target Node.js (externalises built-ins automatically)
    "--target=node20",
    "--format=cjs",                // Output CJS so we can require() it
    "--outfile=" + serverBundlePath,
    "--log-level=warning",
    "--main-fields=module,main",
    "--conditions=import,require,node",
    "--ignore-annotations",        // Keep bare side-effect imports (h3-v2 etc.)
    "--external:fsevents",         // macOS native addon — never needed on Linux/Vercel
  ],
  { stdio: "inherit", cwd: ROOT },
);
console.log("✅  Server bundle → .vercel/output/functions/index.func/_server_bundle.js");

// ── 4. Write the Vercel function handler (index.js) ──────────────────────────
// This is a plain CJS file. It requires the bundled server and bridges
// Node.js IncomingMessage/ServerResponse ↔ Fetch API Request/Response.
writeFileSync(
  join(FUNC, "index.js"),
  `"use strict";
// SATTVAYOGA 365 — Vercel SSR Handler
// Bridges Node.js http ↔ TanStack Start Fetch API server

const _mod = require("./_server_bundle.js");
// The server bundle exports: { default: { fetch(req, env, ctx) => Response } }
const server = _mod && _mod.default ? _mod.default : _mod;

module.exports = async function handler(req, res) {
  // Reconstruct the full URL from Vercel proxy headers
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host  = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url   = new URL(req.url, proto + "://" + host);

  // Convert Node.js headers object → Fetch API Headers
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v !== undefined) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
  }

  // Buffer request body for non-GET requests
  const method = (req.method || "GET").toUpperCase();
  let body;
  if (method !== "GET" && method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    if (chunks.length) body = Buffer.concat(chunks);
  }

  const fetchReq = new Request(url.toString(), { method, headers, body });

  try {
    const response = await server.fetch(fetchReq, {}, {});

    res.statusCode = response.status;
    for (const [k, v] of response.headers.entries()) res.setHeader(k, v);

    // Stream response body
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("[SATTVAYOGA SSR]", err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain");
    res.end("Internal Server Error");
  }
};
`,
);
console.log("⚡  Handler → .vercel/output/functions/index.func/index.js");

// ── Write a local package.json to force CJS mode inside the function dir ─────
// The project root has "type":"module" which makes ALL .js files ESM by default.
// A local package.json with "type":"commonjs" overrides this for the func dir.
writeFileSync(
  join(FUNC, "package.json"),
  JSON.stringify({ type: "commonjs" }, null, 2),
);

// ── 5. .vc-config.json (Node.js 20 runtime) ──────────────────────────────────
writeFileSync(
  join(FUNC, ".vc-config.json"),
  JSON.stringify(
    {
      runtime:          "nodejs20.x",
      handler:          "index.js",
      launcherType:     "Nodejs",
      shouldAddHelpers: false,
      maxDuration:      30,
    },
    null,
    2,
  ),
);

// ── 6. Vercel routing config ──────────────────────────────────────────────────
// CRITICAL: { handle: "filesystem" } tells Vercel to serve files from
// .vercel/output/static/ BEFORE falling through to the SSR function.
// Without it, the catch-all '^/(.*)$' intercepts /assets/*.css requests
// and sends them to the Node.js function instead of the static folder,
// which is why CSS/JS don't load (just bare HTML with no styles).
writeFileSync(
  join(OUT, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Step 1: Set immutable cache headers on hashed assets (continue processing)
        {
          src: "^/assets/(.+)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // Step 2: Serve static files from .vercel/output/static/ if they exist
        // (this is where /assets/*.css, /assets/*.js, /assets/*.jpg land)
        { handle: "filesystem" },
        // Step 3: Everything else (all app routes) → SSR Node.js function
        { src: "^/(.*)$", dest: "/index" },
      ],
    },
    null,
    2,
  ),
);

console.log("🚀  .vercel/output/ ready  (Node.js 20 · esbuild self-contained bundle)");
