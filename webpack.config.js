'use strict';

var webpack = require('webpack');

module.exports = {
  watch: true,

  context: __dirname,
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'strict' }
    ]
  }
};