const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/main.tsx",

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],

    output: {
        path: `${__dirname}/dist`,
        filename: "[name].bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false },
                    },
                    "sass-loader",
                ],
            },
        ],
    },

    resolve: {
        extensions: [
            ".ts", ".tsx", ".js", ".jsx", ".json",
        ],
    },

    devServer: {
        contentBase: `${__dirname}/dist`,
        watchContentBase: true,
    },
};
