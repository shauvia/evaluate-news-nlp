const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: './src/client/c_index.js',
  module:{
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename:"index.html",
    })
  ]
};
