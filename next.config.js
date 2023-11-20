/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/gateway/:path*",
        destination: `https://gateway.${
          !!process.env.NEXT_PUBLIC_TESTNET ? "dev." : ""
        }rss3.io/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
