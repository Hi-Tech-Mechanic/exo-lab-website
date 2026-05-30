const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    // Разделяем логику: critical выполнится мгновенно, index — загрузится в фоне
    entry: {
        index: './dev/js/index.js',
    },
    
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(mp4|mpeg|webm)$/,
                type: 'asset/resource', // Используем современный Asset Modules вместо устаревшего file-loader
                generator: {
                    filename: 'videos/[name][ext]'
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            template: "./dev/index.html",
            filename: 'index.html',
            // Включаем 'body', чтобы Webpack сам управлял тегами скриптов
            inject: 'body',
            minify: false,
        }),

        // Этот плагин находит скомпилированный critical.bundle.js и встраивает его в HTML текстом
        new HtmlInlineScriptPlugin({
            scriptMatch: [/.bundle\.js$/],
        }),

        new MiniCssExtractPlugin(),
        
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./dev/images"),
                    to: path.resolve(__dirname, "dist/images")
                },
                {
                    from: path.resolve(__dirname, "favicon.png"),
                    to: path.resolve(__dirname, "dist")
                },
                // Обновляем в корне проекта bundle-файлы
                {
                    from: path.resolve(__dirname, "./dist/index.html"),
                    to: path.resolve(__dirname, "./index.html"),
                    force: true
                },
                {
                    from: path.resolve(__dirname, "./dist/index.css"),
                    to: path.resolve(__dirname, "./index.css"),
                    force: true
                },
            ]
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true,
    },

    mode: "production",
    // mode: "development"
}
