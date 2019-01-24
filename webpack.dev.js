const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
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
        vuejs: 'vue.js',
        filename: `${page}.html`,
        template: './src/templates/page.html'
    }))
}

module.exports = merge(base, {
    entry,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin([
            './src/templates/vue.js',
        ]),
        new HotModuleReplacementPlugin(),
        ...htmlWebpacks
    ]
})