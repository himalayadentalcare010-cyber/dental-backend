const path = require('path');const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './server.js', // Entry point of your app
  target: 'node', // Important for backend
  externals: [nodeExternals()], // Exclude node_modules
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // only if using Babel
        },
      },
    ],
  },
  optimization: {
    minimize: false,
    usedExports: false,
  },
  target: 'node',
  externalsPresets: { node: true },
  mode: 'production', // or 'development'
};
