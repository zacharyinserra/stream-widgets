var webpack = require('webpack');
var path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, 'App'),
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /(\.css)$/, use: ['style-loader', 'css-loader']}
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ]
}