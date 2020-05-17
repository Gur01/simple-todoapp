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
        publicPath: "/",
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.join(__dirname, "src"),
            server: path.join(__dirname, "src", "server"),
            assets: path.join(__dirname, "src", "assets"),
            components: path.join(__dirname, "src", "components"),
        },
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
