const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    entry: {
        index: './dev/js/index.js',
    },
    
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(mp4|mpeg|webm)$/,
                type: './dev/videos', // Используем современный Asset Modules вместо устаревшего file-loader
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
            filename: './index.html',
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
                    to: path.resolve(__dirname, "./dist/images")
                },
                {
                    from: path.resolve(__dirname, "./dev/videos"),
                    to: path.resolve(__dirname, "./dist/videos")
                },
                {
                    from: path.resolve(__dirname, "./favicon.png"),
                    to: path.resolve(__dirname, "./dist")
                },
            ]
        }),

        // Обновляем в корне проекта bundle-файлы
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        { 
                            source: path.resolve(__dirname, './dist/index.html'), 
                            destination: path.resolve(__dirname, './index.html') 
                        },
                        { 
                            source: path.resolve(__dirname, './dist/index.css'), 
                            destination: path.resolve(__dirname, './index.css') 
                        },
                        { 
                            source: path.resolve(__dirname, './dist/videos'), 
                            destination: path.resolve(__dirname, './videos') 
                        },
                        { 
                            source: path.resolve(__dirname, './dist/images'), 
                            destination: path.resolve(__dirname, './images') 
                        },
                    ],
                },
            },
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        open: true,
    },

    mode: "production",
    // mode: "development"
}
