/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

export default nextConfig;
