const path = require('path');


module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        query: {
          compact: true,
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
    ],
  },
};
