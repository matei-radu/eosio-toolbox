const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { commonConfig } = require('./webpack.common');

module.exports = merge(commonConfig, {
  // This also sets `process.env.NODE_ENV` to `production`.
  mode: 'production',

  output: {
    // Since the bundle is split into multiple chunks, use the [name] template so that
    // each chunk can use its own name.
    filename: 'js/[name].[contenthash].js',
  },

  plugins: [
    // Clean the build directory before each build. This ensures that obsolete files from previous
    // builds don't end up polluting newer ones.
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        // Disable default behaviour for vendor and main chunks
        default: false,
        vendors: false,

        // All vendors packages
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
          priority: 10,
        },
      },
    },
  },
});
