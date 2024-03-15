/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'd10fsby4aele0n.cloudfront.net', protocol: 'https' },
    ],
  },
};

module.exports = nextConfig;
