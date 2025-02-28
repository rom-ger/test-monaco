const { merge } = require('webpack-merge');
const getPlugins = require('./webpack.plugins');
const common = require('./webpack.common.js');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    // devtool: 'hidden-source-map',
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             exclude: /assets/,
    //         }),
    //     ],
    // },
    plugins: getPlugins(true),
});