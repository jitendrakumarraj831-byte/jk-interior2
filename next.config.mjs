/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // unoptimized: true, <--- इस लाइन को हटा दें या false करें
    unoptimized: false, 
    
    // ये लाइनें जोड़ें ताकि Google आपकी फोटो को हल्का (Compress) कर सके
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
}

export default nextConfig
