import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      // Google OAuth images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },

      // Cloudinary uploads
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      // Unsplash dummy images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Lorem Picsum placeholders
      {
        protocol: "https",
        hostname: "picsum.photos",
      },

      // Upstash placeholder API (dummy)
      {
        protocol: "https",
        hostname: "api.upstash.app",
      },

      // placehold.co for UI mockups
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org", // ✔ add this
      },
    ],
  },
};

export default nextConfig;
