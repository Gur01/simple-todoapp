const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "src", "index.tsx")
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist" ),
        publicPath: path.join(__dirname, "public"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                    }
                },
                exclude: "/node_modules/",
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                      },

                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.join(__dirname, "public", "index.html")}),
    ]
};