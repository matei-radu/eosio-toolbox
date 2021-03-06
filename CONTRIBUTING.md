# Contributing to EOSIO Toolbox
Thank you for even just considering contributing to this project. Seeing people using and improving my projects, either by reporting bugs or making PRs, brings me more joy than it probably should ❤️.

## Table of Contents
- [Development](#development)
  - [Environment variables](#environment-variables)
- [Operations](#operations)
  - [webpack](#webpack)
  - [Build metadata](#build-metadata)
- [License](#license)

## Development
### Requirements
- npm v7.x
- Node.js v12.x or most recent LTS version

More recent Non-LTS versions of Node.js, like 13 and 15, are probably fine too, but it is still recommended using an LTS version.

### Environment variables
The project is configured to have some support for environment variables through webpack and dotenv.

#### Naming convention
To avoid name collision with other system environment variables available at build time, application variables must be prefixed with `EOSIO_TOOLBOX_`. Examples:

```
EOSIO_TOOLBOX_FOO
EOSIO_TOOLBOX_BAR
```

#### Defining variables through .env
Create a `.env` file in the project root directory and add environment variables on new lines in the form of `NAME=VALUE`. For example:

```
EOSIO_TOOLBOX_DB_HOST=localhost
EOSIO_TOOLBOX_DB_USER=root
EOSIO_TOOLBOX_DB_PASS=s1mpl3
```

Do not commit your `.env` to version control.

#### Defining variables as environment variables directly
Of course, environment variables set through your operating system are respected and have priority over the ones defined in `.env`.

## Operations
### webpack
EOSIO Toolkit uses [webpack](https://webpack.js.org/) as its core build tool to spin up a development environment and to generate production builds.

webpack configuration files are located in `<project root>/webpack`.

### Build metadata
A set of data describing the current build, such as version and build time, is collected by webpack and exposed to the application through its [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/). Thus, metadata values are available through `process.env`.

For consistency and ease of read, all build metadata values are prefixed with `BUILD_` in addition to the regular app prefix. Examples:

```
EOSIO_TOOLBOX_BUILD_FOO
EOSIO_TOOLBOX_BUILD_BAR
```

Most of the metadata is inferred and does not need manual setting. However, individual values can be overwritten through [environment variables](#environment-variables).

#### List of metadata variables

| Variable | Description |
|----------|-------------|
| `EOSIO_TOOLBOX_BUILD_VERSION` | Version of the application, inferred from `package.json`. |
| `EOSIO_TOOLBOX_BUILD_HASH` | Git commit hash of HEAD. |
| `EOSIO_TOOLBOX_BUILD_DATE` | ISO 8601 Date and time string of when the build was created. |

## License
By contributing your code, you agree to license your contribution under the [Apache License 2.0](./LICENSE).
