const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js',
    },
    
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist"),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(mp4|mpeg|webm)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[name][ext]'
                }
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: './index.html',
            inject: 'body',
            minify: false,
        }),

        new HtmlInlineScriptPlugin({
            scriptMatch: [/.bundle\.js$/],
        }),

        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./images"),
                    to: path.resolve(__dirname, "./dist/images")
                },
                {
                    from: path.resolve(__dirname, "./videos"),
                    to: path.resolve(__dirname, "./dist/videos")
                },
                {
                    from: path.resolve(__dirname, "./favicon.png"),
                    to: path.resolve(__dirname, "./dist")
                },
            ]
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        open: true,
    },

    mode: "production",
}