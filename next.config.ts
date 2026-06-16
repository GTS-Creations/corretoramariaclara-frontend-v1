import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kwpnceouaimwmvvhnbgg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "corretoramariaclara-backend-v1.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
