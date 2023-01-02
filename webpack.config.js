const path = require('path');
const SRC_PATH = path.resolve(__dirname, 'frontend/src');

module.exports = {
  entry: SRC_PATH,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'frontend/static/build'),
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};