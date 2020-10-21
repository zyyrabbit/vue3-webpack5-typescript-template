'use strict';
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const cssLoader = require('./css-loader.config');

// 根目录
const home = path.resolve(__dirname, '..');

module.exports = {
  entry: path.join(home, 'src/main.ts'),
  context: path.join(home, 'src'),
  output: {
    path: path.join(home, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '',
    chunkFilename: 'static/js/[id].[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.vue', '.jsx', '.js', '.json'],
    alias: {
      '@': path.join(home, 'src'),
      vue: '@vue/runtime-dom',
    },
    modules: [
      'node_modules',
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2000,
            name: path.posix.join('static/assets/font', '[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.(svg|gif|png|jpe?g)(\?\S*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: path.posix.join('static/assets/img', '[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.css$/,
        use: cssLoader.css
      },
      {
        test: /\.scss$/,
        use: cssLoader.scss
      }
    ],
  },
  plugins: [
    // 以下为联邦模块，v5 新加核心功能，实际应用可注释
    new ModuleFederationPlugin({
      name: 'demo',
      filename: 'remoteEntry.js',
      remotes: {
        home: 'home@http://localhost:3001/remoteEntry.js',
      },
      exposes: {},
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      title: 'vu3-webpack5-typescript',
      template: path.join(home, './public/index.html'),
      chunks: ['main'],
      inlineSource: 'runtime~.+\\.js'
    }),
    new CopyPlugin(
      {
        patterns: [{
          from: path.join(home, 'public'),
          to: path.join(home, 'dist'),
          toType: 'dir',
          globOptions: {
            dot: false,
            ignore: [
              '**/index.html'
            ]
          }
        }]
      }
    ),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
}
