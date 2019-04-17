const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base')
const readdirSync = require('fs').readdirSync

// Collect the page's names
const files = readdirSync('./src/pages')
let entry = {}, htmlWebpacks = []
for (let file of files) {
    let page = file.substr(0, file.indexOf('.'))
    entry[page] = `./src/pages/${page}.vue`
    htmlWebpacks.push(new HtmlWebpackPlugin({
        name: page,
        vuejs: 'vue.min.js',
        filename: `${page}.html`,
        template: './src/templates/page.ejs'
    }))
}

module.exports = merge(base, {
    mode: 'production',
    entry,
    optimization: {
        splitChunks: {
            chunks: 'async'
        },
        runtimeChunk: true,
        namedChunks: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            './src/templates/vue.min.js',
        ]),
        ...htmlWebpacks
    ]
})