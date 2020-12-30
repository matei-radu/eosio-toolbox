const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');

/**
 * Development webpack configuration.
 *
 * This configuration is based on the common, base one. It adds some loaders for
 * CSS and media assets in such way that it allows for hot reloads. Of course,
 * it also sets up the webpack Development Server.
 */
module.exports = merge(commonConfig, {
  mode: 'development',

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
});
