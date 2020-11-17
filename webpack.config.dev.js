const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(base, {
  entry: './src/index-dev.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        WAYKE_BRANCH_ID: `"${process.env.WAYKE_BRANCH_ID}"`,
        WAYKE_VALUATION_ADDRESS: `"${process.env.WAYKE_VALUATION_ADDRESS}"`,
        WAYKE_LEAD_ADDRESS: `"${process.env.WAYKE_LEAD_ADDRESS}"`,
        WAYKE_CONDITION_REDUCTION_VERY_GOOD: process.env.WAYKE_CONDITION_REDUCTION_VERY_GOOD,
        WAYKE_CONDITION_REDUCTION_GOOD: process.env.WAYKE_CONDITION_REDUCTION_GOOD,
        WAYKE_CONDITION_REDUCTION_OK: process.env.WAYKE_CONDITION_REDUCTION_OK,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: ['./src/**/*.{ts,js}'],
      },
    }),
  ],
  devServer: {
    hot: false,
    port: 5000,
    allowedHosts: process.env.WAYKE_HOST
      ? process.env.WAYKE_HOST.replace(/\s/g, '').split(',')
      : undefined,
  },
});
