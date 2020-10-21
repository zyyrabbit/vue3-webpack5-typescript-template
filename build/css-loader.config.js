'use strict';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === 'production';

exports.css = [
  isProd ? MiniCssExtractPlugin.loader :  'style-loader',
  'css-loader'
];

exports.scss = [
  /* 
    vue-style-loader 和 css-loader@^4.0.0 结合有问题, 因为默认开始 module: true,
    这里是用style-loader 代替 vue-style-laoder, 但是SSR 场景下可能有些问题，
    解决方案：https://github.com/vuejs/vue-style-loader/issues/46#issuecomment-670624576
  */ 
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  'sass-loader'
];