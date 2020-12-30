const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { commonConfig } = require('./webpack.common');

/**
 * Production webpack configuration.
 *
 * This configuration is based on the common, base one. It creates a minified,
 * production-ready application bundle.
 */
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

        // React specific chunk
        react: {
          chunks: 'all',
          name: 'react',
          test: /node_modules\/(react|react-dom)\//,
          priority: 20,
        },

        // All other vendors
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
