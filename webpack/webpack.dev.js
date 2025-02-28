const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const getPlugins = require('./webpack.plugins');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    plugins: getPlugins(),
});