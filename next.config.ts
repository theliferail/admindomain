import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/admin',
  assetPrefix: '/admin',
  poweredByHeader: false,
  output: 'standalone',
};

export default nextConfig;
