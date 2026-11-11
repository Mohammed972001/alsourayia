import type { NextConfig } from "next";

// Static export for Cloudflare Workers static assets (ADR-0001). Photos are pre-sized WebP from
// scripts/media.mjs and rendered by src/components/Photo.tsx, so next/image is not used.
const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
