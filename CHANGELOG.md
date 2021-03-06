# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Upgraded NPM lockfile to version 2.
- Upgraded TypeScript dependencies:
  - `typescript` from `4.1.3` to `4.2.3`
  - `tslib` from `2.0.3` to `2.1.0`
- Upgraded i18next dependencies:
  - `i18next` from `19.8.5` to `19.9.1`
  - `i18next-http-backend` from `1.1.0` to `1.1.1`
  - `react-i18next` from `11.8.5` to `11.8.8`
- Upgraded ESLint dependencies:
  - `eslint` from `7.18.0` to `7.21.0`
  - `@typescript-eslint/eslint-plugin` from `4.14.1` to `4.16.1`
  - `@typescript-eslint/parser` from `4.14.1` to `4.16.1`
- Upgraded webpack dependencies:
  - `webpack` from `5.19.0` to `5.24.3`
  - `webpack-cli` from `4.4.0` to `4.5.0`
  - `mini-css-extract-plugin` from `1.3.5` to `1.3.9`
  - `html-webpack-plugin` from preview `5.0.0-beta.5` to stable `5.2.0`
  - `copy-webpack-plugin` from `7.0.0` to `8.0.0`
  - `css-loader` from `5.0.1` to `5.1.1`
  - `ts-loader` from `8.0.14` to `8.0.17`
  - `dotenv-webpack` from `6.0.0` to `7.0.1`

## [0.2.1] - 2021-02-01
### Changed
- UI strings are now properly managed with i18n for React. This is the foundation for future translations in other languages.

## [0.2.0] - 2021-01-30
### Added
- `getInfo` RPC method to `jsonRpc`.
- Chain id, block info to Home page.

### Changed
- Replaced `steebchen/nginx-spa` with `nginx:mainline-alpine` as it was breaking paths with dots (`.`) like `/account/eosio.token`. This also allowed adding gzip compression and Cache-Control headers.
- Upgraded some webpack dependencies:
  - `mini-css-extract-plugin` from `1.3.4` to `1.3.5`
  - `webpack-cli` from `4.3.1` to `4.4.0`
  - `webpack` from `5.15.0` to `5.19.0`

## [0.1.0] - 2021-01-30
### Added
- webpack v5 setup with React and TypeScript.
- Routing with `react-router` v6.
- 404 page for unrecognized routes.
- Account page with
  - RAM, CPU, NET resources summary.
- Search bar that allows text searching. Based on the type of input it will direct the user to the appropriate page. Current supported types are:
  - account names, will redirect to the Account page.
- Settings page that
  - display app build info.
- Empty Home page.

[Unreleased]: https://github.com/matei-radu/eosio-toolbox/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/matei-radu/eosio-toolbox/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/matei-radu/eosio-toolbox/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/matei-radu/eosio-toolbox/compare/7978a05dacb7be59366fe4f2418b268b1b0019a7...v0.1.0
