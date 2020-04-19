const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "src", "index.tsx")
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname ),
        publicPath:  "/public",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }, 
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //         "file-loader",
            //     ],
            // },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.join(__dirname, "src", "index.html")})
    ]
};