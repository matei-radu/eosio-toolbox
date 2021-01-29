const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')

const ROOT_PATH = path.join(__dirname, '..')
const DIST_PATH = path.join(ROOT_PATH, 'dist')
const SRC_PATH = path.join(ROOT_PATH, 'src')

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

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  plugins: [
    // Copy the entry HTML file to the build directory, inject the output bundles as `<script>`s.
    // Content is minified automatically when `mode` is set to `production`.
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.html'),
    }),

    // Replace instances of `process.env` in the application code with their actual values
    // during the build process.
    new DotenvPlugin({
      path: path.join(ROOT_PATH, '.env'),
      // Load all the predefined `process.env` variables which will trump anything local.
      systemvars: true,
    }),

    // Infer and compose build metadata.
    // Note that with EnvironmentPlugin chained _after_ DotenvPlugin it is possible to overwrite
    // metadata values with the latter.
    new EnvironmentPlugin((() => {
      const vars = {
        'EOSIO_TOOLBOX_BUILD_VERSION': require(path.join(ROOT_PATH, 'package.json')).version,
        'EOSIO_TOOLBOX_BUILD_DATE': new Date().toISOString(),
      }

      // Add the build hash variable only if it is avaialble.
      const buildHash = getBuildHashFromGit()
      if (buildHash) {
        vars['EOSIO_TOOLBOX_BUILD_HASH'] = buildHash
      }

      return vars
    })()),
  ],
}

function getBuildHashFromGit() {
  try {
    return require('child_process').execSync('git rev-parse HEAD').toString()
  } catch (e) {
    return undefined
  }
}

module.exports = {
  commonConfig,
  ROOT_PATH,
  DIST_PATH,
  SRC_PATH,
}
