var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: __dirname + '/src/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            inject: 'body'
        })
    ]
}
