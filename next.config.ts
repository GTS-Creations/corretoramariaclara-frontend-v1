import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "corretoramariaclara-backend-v1.onrender.com",
      },
    ],
  },
};

export default nextConfig;
