import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // uncomment to build static export for Hostinger
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
