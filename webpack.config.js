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
          options: {
            presets: [['@babel/preset-env', {
              "targets": {
                "node": "6"
              },
              "useBuiltIns": "entry"
            }]],
            plugins: [
              "add-module-exports"
            ]
          }
        }
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
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "browsers": "> 1%"
                },
                "loose": true,
                "modules": false,
                "useBuiltIns": "entry"
              }]
            ],
            "plugins": [
              "add-module-exports"
            ]
          }
        }
      },
    ]
  }
};

module.exports = [
  nodeConfig,
  browserConfig,
];
