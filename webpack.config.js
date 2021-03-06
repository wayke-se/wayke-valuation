require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const version = require('./package.json').version;

const URL_PRODUCTION = 'https://api.wayke.se';
const URL_DEVELOPMENT = 'https://test-ext-api.wayketech.se';

module.exports = (_env, argv) => ({
  devtool: 'source-map',
  context: path.resolve(__dirname),
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `wayke.valuation.v${version}.js`,
    library: 'WaykeValuation',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WAYKE_URL: `"${argv.mode === 'production' ? URL_PRODUCTION : URL_DEVELOPMENT}"`,
      },
    }),
  ],
});
