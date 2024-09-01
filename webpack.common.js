const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
        popup: path.resolve("./src/popup/popup.tsx"),
        sidepanel: path.resolve("./src/sidepanel/sidePanel.tsx"),
        background: path.resolve("./src/background/backgroundScript.ts"),
        content: path.resolve("./src/content/contentScript.ts"),
    },
   
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js','.tsx'], 
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/static' },
                { from: 'src/static/manifest.json', to: 'manifest.json' } // Ensure manifest.json is copied to dist
            ]
        }),
        ...getHtmlPlugins(["popup"]),
        ...getHtmlPlugins(["sidepanel"]),
    ],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },

    optimization: {
        splitChunks: {
            chunks(chunk) {
                return (
                    chunk.name !== "content" &&
                    chunk.name !== "background"
                );
            },
        },
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HtmlPlugin({
                title: "xHealth",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}