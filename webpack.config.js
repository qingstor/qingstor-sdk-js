const path = require('path');
const webpack = require('webpack');

const nodeConfig = {
  entry: ['@babel/polyfill', './index.js'],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node/qingstor-sdk.js',
    libraryTarget: "umd",
    library: "qingstor_sdk"
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': './fetch/fetch-node'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  }
};

const browserConfig = {
  entry: ['@babel/polyfill', './index.js'],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser/qingstor-sdk.js',
    libraryTarget: "umd",
    library: "qingstor_sdk"
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': './fetch/fetch-browser'
    })
  ],
  node: {
    "fs": "empty",
    "process": "mock"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  }
};

module.exports = [
  nodeConfig,
  browserConfig,
];
