/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();
console.log(path.resolve(__dirname, "public"));
module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.tsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: path.resolve(__dirname, "public"),
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: "/node_modules/",
                use: {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({
                            before: [styledComponentsTransformer],
                        }),
                    },
                },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "src/index.html",
        }),
    ],
};
