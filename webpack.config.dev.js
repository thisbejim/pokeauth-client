var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: ["babel-polyfill", "./index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css-loader?modules&camelCase' },
      { test: /\.(png|svg|jpg|jpeg)$/, exclude: /node_modules/, loader: 'url?limit=25000' },
    ],
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
  ],
},
};
