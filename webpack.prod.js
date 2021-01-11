const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
            // IMAGES
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Html boilerplate',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            linkType: 'text/css',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/img", to: "./img" },
            ],
        }),
    ]
}