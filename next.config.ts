/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "atlasgol.com",
      },
      {
        protocol: "https",
        hostname: "rosepack.com",  // این رو اضافه کن
      },
    ],
  },
};

module.exports = nextConfig;
