/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.natgeofe.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'd2jzc2rxltjw7u.cloudfront.net',
        port: '',
        pathname: '/**'
      }
    ]
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  reactStrictMode: false
};

module.exports = nextConfig;
