import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const DEFAULT_PORT = 5173;

function resolvePort(rawPort: string | undefined): number {
  if (!rawPort) return DEFAULT_PORT;
  const parsedPort = Number(rawPort);
  if (Number.isNaN(parsedPort) || parsedPort <= 0) return DEFAULT_PORT;
  return parsedPort;
}

function resolveBasePath(rawBasePath: string | undefined): string {
  if (!rawBasePath) return "/";
  if (rawBasePath === "/") return "/";
  const withLeadingSlash = rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const port = resolvePort(process.env.PORT);
const basePath = resolveBasePath(process.env.BASE_PATH);

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.REPL_ID !== undefined
      ? [
          runtimeErrorOverlay(),
        ]
      : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("xlsx")) return "xlsx";
          if (id.includes("@radix-ui") || id.includes("lucide-react")) return "ui-vendor";
          // framer-motion v12 is three packages — the `framer-motion` entry plus
          // `motion-dom` (the big one, ~94 kB) and `motion-utils`. Matching only
          // "framer-motion" left motion-dom in the shared `vendor` chunk, so every
          // route downloaded it alongside helmet/wouter whether or not it rendered
          // a motion component, and a framer-motion upgrade invalidated `vendor`.
          if (/[/\\]node_modules[/\\](framer-motion|motion-dom|motion-utils|motion)[/\\]/.test(id))
            return "motion-vendor";
          // Match only the actual react/react-dom/scheduler packages (by their real
          // node_modules folder name), not every dependency whose name merely contains
          // "react" (react-hook-form, react-day-picker, @radix-ui/react-*, etc.) — the
          // broad substring match previously produced a vendor <-> react-vendor cycle.
          if (/[/\\]node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return "react-vendor";
          return "vendor";
        },
        // Every emitted file is content-hashed and lives under one of two
        // prefixes, so vercel.json can serve the whole build `immutable` with
        // two rules. The entry used to land at the dist root next to the
        // hand-written files in public/ (sw.js, robots.txt, sitemap.xml), which
        // are emphatically *not* immutable — keeping it in chunks/ means no
        // header rule has to distinguish them by filename shape.
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT || 8080}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
