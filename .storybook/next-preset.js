const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // TypeScript with Next.js
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, '../components'),
        path.resolve(__dirname, '../stories'),
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['react-docgen'],
          },
        },
      ],
    });

    newConfig.resolve.modules.push(path.resolve(__dirname, '../src'));
    newConfig.resolve.extensions.push('.ts', '.tsx');

    return newConfig;
  },
};
