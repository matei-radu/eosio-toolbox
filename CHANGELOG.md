# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

[Unreleased]: https://github.com/matei-radu/eosio-toolbox/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/matei-radu/eosio-toolbox/compare/7978a05dacb7be59366fe4f2418b268b1b0019a7...v0.1.0
