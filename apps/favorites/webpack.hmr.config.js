const { composePlugins, withNx } = require('@nx/webpack');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

// Set true if you don't want type checking
const skipTypeChecking = false;

// Nx plugins for webpack.
module.exports = composePlugins(withNx({ skipTypeChecking }), config => {
  return {
    ...config,
    entry: ['webpack/hot/poll?100', ...config.entry.main],
    externals: [
      nodeExternals({
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['apps/favorites/src/assets'],
        optimization: false,
        outputHashing: 'none',
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
    ],
  };
});
