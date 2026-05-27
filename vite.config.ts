// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Set cloudflare: false so the build outputs a Node.js/Edge-compatible server bundle
// (dist/server/server.js) instead of a Cloudflare-specific Worker format.
// The postbuild.mjs script then packages it into .vercel/output/ (Build Output API v3)
// so Vercel can run it as an Edge Function with full SSR.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
});
