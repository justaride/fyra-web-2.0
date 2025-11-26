import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fyra-web-2.0',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
