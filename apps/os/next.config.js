/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@photomagic/ui',
    '@photomagic/design-language',
    '@photomagic/tailwind-config',
    '@photomagic/database',
    '@photomagic/storage',
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
