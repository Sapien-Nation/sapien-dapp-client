/** @type {import('next').NextConfig} */
const withPreact = require('next-plugin-preact');
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const ContentSecurityPolicy = `
  default-src 'self';
  object-src 'self';
  script-src-elem 'self' 'unsafe-inline' data: http://localhost:3000 https://localhost:3000 https://static.cloudflareinsights.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.youtube.com *.ytimg.com;
  child-src *.youtube.com *.ytimg.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  connect-src * 'self' blob: data:;
  font-src data: 'self' *.gstatic.com *.amazonaws.com;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
];

const moduleExports = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ['d1bdmh0gdusw0k.cloudfront.net', 'd151dmflpumpzp.cloudfront.net'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  // TODO add websocket endpoint
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/core-api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v3/:path*`,
        },
        {
          source: '/core-api/notification/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v3/notification/:path*`,
        },
        {
          source: '/core-api/user/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_AUTH_URL}/api/v3/:path*`,
        },
        {
          source: '/user-api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_AUTH_URL}/api/v3/user/:path*`,
        },
        {
          source: '/auth-api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_AUTH_URL}/api/v3/auth/:path*`,
        },
        {
          source: '/wallet-api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_AUTH_URL}/api/v3/wallet/:path*`,
        },
      ],
      fallback: [
        {
          source: '/wallet-api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_AUTH_URL}/api/v3/wallet/:path*`,
        },
      ],
    };
  },
};

const sentryWebpackPluginOptions = {
  org: 'sapien-network',
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT_NAME,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  silent: true,
};

if (process.env.IS_LEAN_ENVIROMENT === 'true') {
  module.exports = withPreact(moduleExports);
} else {
  module.exports =
    process.env.ANALYZE === 'true'
      ? withBundleAnalyzer({})
      : withPreact(
          Boolean(process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN)
            ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
            : moduleExports
        );
}
