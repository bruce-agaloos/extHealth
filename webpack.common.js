const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = path.join(pdfjsDistPath, 'cmaps');

module.exports = {
    entry: {
        popup: path.resolve("./src/popup/popup.tsx"),
        sidepanel: path.resolve("./src/sidepanel/sidePanel.tsx"),
        guide: path.resolve("./src/guide/guide.tsx"),
        search: path.resolve("./src/search/search.tsx"),
        background: path.resolve("./src/background/backgroundScript.ts"),
        content: path.resolve("./src/content/contentScript.ts"),
        externalPopup: path.resolve("./src/externalPopup/externalPopup.tsx"),
        pdfviewer: path.resolve("./src/pdfviewer/layout.tsx"),
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
            {
                test: /\.html$/i,
                use: "html-loader", // Add html-loader to handle HTML files
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
        new CopyPlugin({
            patterns: [
                {
                    from: cMapsDir,
                    to: 'cmaps/'
                },
            ],
        }),
        ...getHtmlPlugins(["popup", "sidepanel", "guide", "search", "externalPopup", "pdfviewer"]),
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
                title: "extHealth",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}