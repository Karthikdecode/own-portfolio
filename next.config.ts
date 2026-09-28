import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer modern formats for the editorial imagery.
    formats: ["image/avif", "image/webp"],
    // Add remote hosts here if images are served from a CDN.
    remotePatterns: [],
  },

  // TODO (hero build phase): if importing Three.js / React Three Fiber causes
  // SSR issues, add `transpilePackages` or `serverExternalPackages` here.
};

export default nextConfig;
