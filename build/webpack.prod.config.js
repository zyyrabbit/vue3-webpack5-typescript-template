'use strict';
const commonConfig = require('./webpack.common.config.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(commonConfig, {
    // 在生产环境下把 devtool 设置成 hidden-source-map，
    // 意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息
    devtool: 'hidden-source-map',
    optimization: {
      runtimeChunk: true, // 用于长期缓存优化
      splitChunks:{
        name: false,
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css', 
        chunkFilename: '[id].[contenthash:8].css'
      }),
      new InlineSourcePlugin(HtmlWebpackPlugin)
    ]
});