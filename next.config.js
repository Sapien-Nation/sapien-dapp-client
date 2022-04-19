/** @type {import('next').NextConfig} */
const withPreact = require('next-plugin-preact');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  images: {
    domains: ['d1bdmh0gdusw0k.cloudfront.net', 'd151dmflpumpzp.cloudfront.net'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
};

const sentryWebpackPluginOptions = {
  release: process.env.NEXT_PUBLIC_RELEASE_NAME || 'protocol',
  org: 'sapien-network',
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT_NAME,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};

module.exports = withPreact(
  withSentryConfig(moduleExports, sentryWebpackPluginOptions)
);
