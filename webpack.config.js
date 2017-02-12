var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var TARGET = process.env.npm_lifecycle_event
var isProduction = TARGET === 'build'

var config = {}

//  General
// ---------------------------------------------

config.devtool = isProduction ? null : 'eval'

config.devServer = {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    stats: {
        chunks: false
    }
}

config.resolve = {
    extensions: ['', '.js', '.jsx']
}

// Entry / Output
// ---------------------------------------------

config.entry = {
    'app': path.join(__dirname, 'src', 'app.js')
}

config.output = {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
}

config.eslint = {
    configFile: '.eslintrc.json'
}

//  Loaders
// ---------------------------------------------

config.module = {
    preLoaders: [
        {test: /\.js?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
        { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.png$/, loader: 'url-loader?limit=100000' },
        { test: /\.jpg$/, loader: 'file-loader' },
        { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
}

//  Plugins
// ---------------------------------------------

config.plugins = []

config.plugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    inject: 'body'
}))

if (isProduction) {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = config
