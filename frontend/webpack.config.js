const path = require('path');
const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  entry: SRC_PATH,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/build'),
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