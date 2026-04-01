import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Serve optimized images in modern formats (AVIF ~50% smaller, WebP ~30% smaller than JPEG)
  images: {
    formats: ['image/avif', 'image/webp'],
    // Limit image sizes to reduce bandwidth on mobile
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Strip unused exports from server components to reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
};

export default nextConfig;
