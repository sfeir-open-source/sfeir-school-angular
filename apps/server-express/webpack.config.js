const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

const configValues = {
  build: {
    default: {
      main: './src/main.js',
      tsConfig: './tsconfig.app.json',
      target: 'node',
      compiler: 'tsc',
    },
    production: {
      optimization: true,
      extractLicenses: true,
      inspect: false,
      fileReplacements: [
        {
          replace: './src/environments/environment.js',
          with: './src/environments/environment.prod.js',
        },
      ],
    },
  },
};

// Determine the correct configValue to use based on the configuration
const configuration = process.env.NX_TASK_TARGET_CONFIGURATION || 'default';

const buildOptions = {
  ...configValues.build.default,
  ...configValues.build[configuration],
};

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/server-express'),
  },
  plugins: [new NxAppWebpackPlugin(buildOptions)],
};
