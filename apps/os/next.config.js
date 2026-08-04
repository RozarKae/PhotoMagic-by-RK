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
  swcMinify: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

module.exports = nextConfig;
