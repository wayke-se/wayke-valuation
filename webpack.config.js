require('dotenv').config();
const path = require('path');
const version = require('./package.json').version;

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `wayke.valuation.v${version}.js`,
    library: 'Wayke',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.css', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: `wayke.valuation.${version}.[hash].[ext]`,
        },
      },
    ],
  },
};
