import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
