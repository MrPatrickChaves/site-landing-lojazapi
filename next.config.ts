import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/modelos/:path*/",
        destination: "/modelos/:path*/index.html",
      },
      {
        source: "/loja/:path*/",
        destination: "/loja/:path*/index.html",
      },
    ];
  },
};

export default nextConfig;
