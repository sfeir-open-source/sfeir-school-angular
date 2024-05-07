const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  return config;
});
