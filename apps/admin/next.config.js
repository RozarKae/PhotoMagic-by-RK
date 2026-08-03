/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@photomagic/ui', '@photomagic/database', '@photomagic/storage'],
  reactStrictMode: true,
};

module.exports = nextConfig;
