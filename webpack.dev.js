const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base')
const readdirSync = require('fs').readdirSync
const path = require('path')

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
        chunks: [page, 'runtime'],
        template: './src/templates/page.ejs'
    }))
}

// Modify the index html for HMR!
htmlWebpacks.push(new HtmlWebpackPlugin({
    env: 'development',
    filename: `index.html`,
    chunks: [],
    template: './src/templates/index.html'
}))

module.exports = merge(base, {
    entry,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        useLocalIp: true,
        disableHostCheck: true,
        writeToDisk: file => {
            return /index.html$/.test(file)
        },
        hot: true
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: './src/templates/vue.js', to: './js' }
        ]),
        ...htmlWebpacks
    ]
})