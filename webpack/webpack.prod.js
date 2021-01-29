const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require ('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { commonConfig } = require('./webpack.common')

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

  module: {
    rules: [
      // For production, content of the CSS files will extracted into one single file that will be
      // injected into the document with a `<link>` tag.
      {
        test: /\.css$/,
        use: [
          // At this stage, the mini loader only extracts all referenced CSS into individual files
          // (this _should_ go for both imported CSS files as modules and CSS-in-JS).
          // The option to then merge all files into one is set in its plugin.
          { loader: MiniCssExtractPlugin.loader },

          // Resolve CSS code, `@import`s and assets used via `url()`.
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    // Clean the build directory before each build. This ensures that obsolete files from previous
    // builds don't end up polluting newer ones.
    new CleanWebpackPlugin(),

    // Output the extract CSS into one file. The `HtmlWebpackPlugin` will handle injecting it
    // with a `<link>` tag.
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
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

    minimizer: [
      // webpack v5 specific syntax that allows extending the default `minimizer`
      // array instead of replacing it.
      '...',

      // Minifies CSS.
      new CssMinimizerPlugin(),
    ],
  },
})
