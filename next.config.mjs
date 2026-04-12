/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ['*.replit.dev', '*.picard.replit.dev', '*.repl.co'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    qualities: [50, 52, 58, 62, 68, 72, 78, 80, 82, 100],
  },
}

export default nextConfig
