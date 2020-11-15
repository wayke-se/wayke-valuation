const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const version = require('./package.json').version;

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `wayke.valuation.v${version}.js`,
    publicPath: '/',
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
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: ['./src/**/*.{ts,js}'],
      },
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'build'),
    port: 5000,
    allowedHosts: process.env.WAYKE_HOST
      ? process.env.WAYKE_HOST.replace(/\s/g, '').split(',')
      : undefined,
  },
};
