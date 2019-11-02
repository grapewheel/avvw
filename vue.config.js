const klawSync = require('klaw-sync')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Collect the page's names
const pages = {}
const vues = klawSync('./src/pages', { nodir: true, filter: item => path.basename(item.path) !== 'vue' })

vues.map(vue => {
    const pagesIndex = vue.path.lastIndexOf('/src/pages/') + 11
    const filename = vue.path.substring(pagesIndex).replace(/vue$/, 'html').replace(/\//, '-')
    const page = filename.substring(0, filename.lastIndexOf("."))

    pages[page] = {
        entry: vue.path,
        template: './public/page.ejs',
        filename,
        chunks: [page, 'runtime'],
        name: page,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    }
})

module.exports = {
    pages,
    publicPath: '',
    filenameHashing: false,
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        writeToDisk: file => {
            return /index.html$/.test(file)
        }
    },
    configureWebpack: {
        output: {
            library: "pageVue",
            libraryTarget: "window"
        },
        optimization: {
            runtimeChunk: {
                name: "runtime"
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                chunks: [],
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            })
        ]
    },
    chainWebpack(config) {
        config.optimization.splitChunks(undefined)

        config.plugin('copy')
            .tap(args => {
                args[0][0].ignore.push(process.env.NODE_ENV === 'development' ? 'vue.min.js' : 'vue.js')
                return args
            })
    }
}
