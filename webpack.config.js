const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: { main: './src/index.js',
            about: './src/about.js',
            analytics: './src/analytics.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/news-diploma-project/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: { loader: "babel-loader" },
            exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                     'file-loader?name=./images/[name].[ext]',
                     {
                         loader: 'image-webpack-loader',
                         options: {
                            bypassOnDebug: true, 
                            disable: true 
                         }
                     },
                ]
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: './styles/[name].[contenthash].css'}),

        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
          }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/analytics.html',
            filename: 'analytics.html'
        }),
        new WebpackMd5Hash(),
    ] 
}