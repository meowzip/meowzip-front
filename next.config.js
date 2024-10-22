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
  rewrites: [
    {
      source: '/api/public/:path*',
      destination: `${process.env.NEXT_PUBLIC_MEOW_API}/:path*`
    },
    {
      source: '/api/auth/:path*',
      destination: `${process.env.NEXT_PUBLIC_AUTH_MEOW_API}/:path*`
    },
    {
      source: '/api/**',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://dev.meowzip.com'
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
        },
        {
          key: 'Access-Control-Allow-Headers',
          value:
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        }
      ]
    }
  ],
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
