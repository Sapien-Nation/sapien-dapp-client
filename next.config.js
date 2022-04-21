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
  org: 'sapien-network',
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT_NAME,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  silent: true,
};

const sentryDisabledFlagForRelease = true;
module.exports = sentryDisabledFlagForRelease
  ? moduleExports
  : withPreact(withSentryConfig(moduleExports, sentryWebpackPluginOptions));
