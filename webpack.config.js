const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    target: "web",
    entry: [
        "./src/index.js",
        "webpack/hot/dev-server",
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/"
    },
    devServer: {
        contentBase: [
            path.join(__dirname, "src"),
            // path.join(__dirname, "assets"),
        ],
        port: 8080,
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/api": "http://localhost:8082",
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [
                    path.resolve(__dirname, "src"),
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.html$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                }
            },
            {
                test: /\.(jpg|png|ico)(\?[a-z0-9#=&.]+)?$/,
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]",
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".scss"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/index.html",
                    to: ""
                }
            ]
        })
    ]
};
