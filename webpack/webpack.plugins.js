const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../build'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser.js',
    }),
    new ESLintWebpackPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: 'node_modules',
        fix: false,
        configType: 'flat',
        overrideConfigFile: path.resolve(__dirname, '../eslint.config.mjs')
    }),
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            memoryLimit: 8192,
        },
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
];

const getPlugins = (isProd) => {
    const result = plugins;
    result.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || (isProd ? 'production' : 'development')),
    }));
    return result;
}

module.exports = getPlugins;