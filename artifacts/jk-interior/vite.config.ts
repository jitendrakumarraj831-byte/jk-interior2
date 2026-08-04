import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal'
import { fileURLToPath } from 'url'

const DEFAULT_PORT = 5173

function resolvePort(rawPort: string | undefined): number {
  if (!rawPort) return DEFAULT_PORT
  const parsedPort = Number(rawPort)
  if (Number.isNaN(parsedPort) || parsedPort <= 0) return DEFAULT_PORT
  return parsedPort
}

function resolveBasePath(rawBasePath: string | undefined): string {
  if (!rawBasePath) return '/'
  if (rawBasePath === '/') return '/'
  const withLeadingSlash = rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const port = resolvePort(process.env.PORT)
const basePath = resolveBasePath(process.env.BASE_PATH)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async () => {
  const plugins: any[] = [react(), tailwindcss()]

  if (process.env.REPL_ID !== undefined) {
    plugins.push(runtimeErrorOverlay())
  }

  if (process.env.NODE_ENV !== 'production' && process.env.REPL_ID !== undefined) {
    // Dynamically import dev-only plugins when available
    try {
      const carto = await import('@replit/vite-plugin-cartographer')
      plugins.push(
        carto.cartographer({
          root: path.resolve(__dirname, '..'),
        })
      )
    } catch (e) {
      // ignore if plugin isn't available in CI
    }
    try {
      const devBanner = await import('@replit/vite-plugin-dev-banner')
      plugins.push(devBanner.devBanner())
    } catch (e) {
      // ignore
    }
  }

  return defineConfig({
    base: basePath,
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, '..', '..', 'attached_assets'),
      },
      dedupe: ['react', 'react-dom'],
    },
    root: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
      cssCodeSplit: true,
      sourcemap: false,
      reportCompressedSize: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return
            if (id.includes('xlsx')) return 'xlsx'
            if (id.includes('@radix-ui') || id.includes('lucide-react')) return 'ui-vendor'
            if (id.includes('framer-motion')) return 'motion-vendor'
            if (/[/\\]node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return 'react-vendor'
            return 'vendor'
          },
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    server: {
      port,
      strictPort: true,
      host: '0.0.0.0',
      allowedHosts: true,
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.API_PORT || 8080}`,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  })
}
