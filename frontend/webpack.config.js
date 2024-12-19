const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Per supportare .js e .jsx
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Per file .js e .jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '.',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'), // Serve i file dalla directory public
        },
        port: 3000,
        open: true, // Apre automaticamente il browser
        historyApiFallback: true, // Supporta SPA routing
    },
};
