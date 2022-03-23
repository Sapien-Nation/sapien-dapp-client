/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  images: {
    domains: ['d1bdmh0gdusw0k.cloudfront.net', 'd151dmflpumpzp.cloudfront.net'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
  release: 'POC',
  org: 'sapien-network',
  project: 'passport-app',
  authToken: 'be41075bb199461180003f41cf271034e2da122743594fa8b127adac9e6e467c',
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
