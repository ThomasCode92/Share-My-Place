/*eslint-env node*/

const path = require('path');

const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const { DefinePlugin } = webpack;
const { CleanWebpackPlugin } = CleanPlugin;

module.exports = {
  mode: 'production',
  entry: {
    sharePlace: './src/scripts/app/share-place.js',
    myPlace: './src/scripts/app/my-place',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.26' }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Share My Place',
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['sharePlace'],
    }),
    new HTMLWebpackPlugin({
      filename: 'my-place/index.html',
      template: './src/my-place.html',
      chunks: ['myPlace'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintWebpackPlugin(),
  ],
};
