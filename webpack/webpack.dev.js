const { merge } = require('webpack-merge')
const { commonConfig } = require('./webpack.common')

/**
 * Development webpack configuration.
 *
 * This configuration is based on the common, base one. It adds some loaders for
 * CSS and media assets in such way that it allows for hot reloads. Of course,
 * it also sets up the webpack Development Server.
 */
module.exports = merge(commonConfig, {
  mode: 'development',

  module: {
    rules: [
      // For development, CSS files will be injected as individual `<style>` tags in the `<head>`
      // section. This solution is the most performant and will allow fast hot reloads.
      {
        test: /\.css$/,
        use: [
          // Turns CSS into JavaScript modules that inject `<style>` tags.
          'style-loader',

          // Resolve CSS code, `@import`s and assets used via `url()`.
          'css-loader',
        ],
      },
    ],
  },

  // Good quality source maps with fast rebuild times, suitable for development.
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    // Enables Hot Module Replacement.
    hot: true,

    port: 3000,

    // Enable overlay UI to display critical errors.
    overlay: true,

    // The application uses the native HTML5 History API and redirects 404s to `index.html`.
    historyApiFallback: true,
  },
})
