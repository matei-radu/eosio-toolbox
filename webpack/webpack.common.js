const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.join(__dirname, '..', 'dist');
const SRC_PATH = path.join(__dirname, '..', 'src');

/**
 * A base, common webpack configuration.
 *
 * Since production and development profiles differ but only in some areas, it makes
 * sense to extract common settings into one source of truth.
 * All concrete configurations will derive from this using `webpack-merge`, which
 * allows to combine multiple webpack configuration objects into one.
 */
const commonConfig = {
  output: {
    path: DIST_PATH,
    publicPath: '/',
  },

  resolve: {
    // webpack resolves _all_ files, including dependencies.
    // Since dependencies export JavaScript files, their extensions need to be included.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    // Copy the entry HTML file to the build directory, inject the output bundles as `<script>`s.
    // Content is minified automatically when `mode` is set to `production`.
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.html'),
    }),
  ],
};

module.exports = {
  commonConfig,
  DIST_PATH,
  SRC_PATH
}
