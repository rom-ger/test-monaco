const path = require('path');
const rules = require('./webpack.rules');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'scripts/[name].[contenthash].js',
        assetModuleFilename: 'files/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        noParse: /\/node_modules\/process\//,
        rules: rules,
    },
    externals: {
        fs: '{}',
        module: '{}',
        os: '{}',
        path: '{}',
        process: '{}',
    },
    devServer: {
        static: {
          directory: path.join(__dirname, '../build')
        },
        open: true,
        hot: true, 
        port: 3000,
    },
    ignoreWarnings: [
        {
          module: /node_modules/,
        },
    ],
};