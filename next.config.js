const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

module.exports = {
  images: {
    domains: ['d151dmflpumpzp.cloudfront.net'],
  },
};
