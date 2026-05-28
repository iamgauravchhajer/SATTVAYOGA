"use strict";
// SATTVAYOGA 365 — Vercel SSR Handler
// Bridges Node.js http ↔ TanStack Start Fetch API server

const _mod = require("./_server_bundle.js");
// The server bundle exports: { default: { fetch(req, env, ctx) => Response } }
const server = _mod && _mod.default ? _mod.default : _mod;

module.exports = async function handler(req, res) {
  // Reconstruct the full URL from Vercel proxy headers
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url, proto + "://" + host);

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
