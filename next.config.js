/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    outputFileTracingIncludes: {
      '/**': ['./prisma/dev.db'],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
