const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        popup: path.resolve("./src/popup/popup.html"),
        background: path.resolve("./src/background/backgroundScript.ts"),
        content: path.resolve("./src/content/contentScript.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/static' },
                { from: 'src/static/manifest.json', to: 'manifest.json' } // Ensure manifest.json is copied to dist
            ]
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, "src/popup/popup.html"),
            filename: "popup.html",
            chunks: ["popup"]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js','.html'], 
    },
};