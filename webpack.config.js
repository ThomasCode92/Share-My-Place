/*eslint-env node*/

const path = require('path');

const webpack = require('webpack');
const dotenv = require('dotenv');

const CleanPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const { DefinePlugin } = webpack;
const { CleanWebpackPlugin } = CleanPlugin;

dotenv.config({ path: './.env' });

module.exports = {
  mode: 'development',
  entry: {
    sharePlace: './src/scripts/app/share-place.js',
    myPlace: './src/scripts/app/my-place',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    new ESLintWebpackPlugin(),
  ],
};
