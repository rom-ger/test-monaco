const rules = [
    {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: (modulePath) => (
          (/node_modules/.test(modulePath) && !/node_modules[\\/](monaco-editor)/.test(modulePath)) ||
          /public/.test(modulePath)
        ),
    },
    {
        test: /\.(ya?ml)$/,
        use: 'yaml-loader',
    },
    {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        options: {
            exportType: 'named',
            svgo: false,
        },
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
    }
];

module.exports = rules;
