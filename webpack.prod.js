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
        chunks: [page, 'runtime'],
        template: './src/templates/page.ejs'
    }))
}

// Modify the index html for production!
htmlWebpacks.push(new HtmlWebpackPlugin({
    env: 'production',
    filename: `index.html`,
    chunks: [],
    template: './src/templates/index.html'
}))

module.exports = merge(base, {
    mode: 'production',
    entry,
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: './src/templates/vue.min.js', to: './js' }
        ]),
        ...htmlWebpacks
    ]
})