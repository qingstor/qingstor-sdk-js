const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

function getConfig(isMiniprogram) {
  return {
    bail: true,
    mode: 'development',
    devtool: false,
    entry: './index.js',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        },
      ]
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: !isMiniprogram ? 'qingstor-sdk.js' : 'qingstor-sdk-miniprogram.js',
      libraryTarget: 'umd',
      library: !isMiniprogram ? 'qingstor_sdk' : 'qingstor_sdk_miniprogram',
    },

    plugins: [
      new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`.
        // In `server` mode analyzer will start HTTP server to show bundle report.
        // In `static` mode single HTML file with bundle report will be generated.
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
        analyzerMode: isMiniprogram ? 'disabled' : 'static',
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8888,
        // Path to bundle report file that will be generated in `static` mode.
        // Relative to bundles output directory.
        reportFilename: 'report.html',
        // Module sizes to show in report by default.
        // Should be one of `stat`, `parsed` or `gzip`.
        // See "Definitions" section for more information.
        defaultSizes: 'parsed',
        // Automatically open report in default browser
        openAnalyzer: false,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory
        generateStatsFile: false,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
        // Relative to bundles output directory.
        statsFilename: 'stats.json',
        // Options for `stats.toJson()` method.
        // For example you can exclude sources of your modules from stats file with `source: false` option.
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        // Log level. Can be 'info', 'warn', 'error' or 'silent'.
        logLevel: 'info'
      }),
      new webpack.DefinePlugin({
        'process.env.MINIPROGRAM': JSON.stringify(isMiniprogram),
      }),
    ],

    node: {
      fs: 'empty',
      process: 'mock'
    },
  };
}

module.exports = [getConfig(false), getConfig(true)];
