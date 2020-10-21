'use strict';
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const home = path.resolve(__dirname, '..');

module.exports = merge(
  commonConfig,
  {
    mode: 'development',
    devtool: 'eval-source-map', // 首次构建比较慢，二次构建比较快，源码映射source
    devServer: {
      contentBase: path.join(home, 'dist'),
      compress: true,
      port: 3001,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
  }
)