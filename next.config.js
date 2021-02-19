const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NEXT_PUBLIC_RELEASE_NAME: RELEASE,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = '';

module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString())
      })
    );

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      RELEASE &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: RELEASE
        })
      );
    }
    return config;
  },
  basePath
});
