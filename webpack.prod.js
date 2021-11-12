/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
// const ImageminWebpackPlugin = require('imagemin-webpack-plugin');
// const ImageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new ImageminWebpWebpackPlugin({
    //   config: [
    //     {
    //       test: /\.(jpe?g|png)/,
    //       options: {
    //         quality: 50,
    //       },
    //     },
    //   ],
    //   overrideExtension: true,
    //   silent: true,
    // }),
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'json' }),
  ],
});
