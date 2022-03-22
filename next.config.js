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
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
