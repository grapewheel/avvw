const klawSync = require('klaw-sync')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Collect the page's names
const pages = {}
const vues = klawSync('./src/pages', {
    nodir: true, traverseAll: true, filter(file) {
        return path.extname(file.path) === '.vue'
    }
})

const pagesIndex = path.resolve(__dirname, 'src/pages').length

vues.map(vue => {
    let filename
    if (process.platform !== 'win32') {
        filename = vue.path.substring(pagesIndex + 1).replace(/\.vue$/, '.html').replace(/\//g, '-')
    } else {
        filename = vue.path.substring(pagesIndex + 1).replace(/\.vue$/, '.html').replace(/\\/g, '-')
    }
    const page = filename.substring(0, filename.lastIndexOf("."))

    // console.log(filename)
    // console.log(page)
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
    filenameHashing: true,
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        writeToDisk: file => {
            return /index.html$/.test(file) || /config.xml$/.test(file)
        }
    },
    configureWebpack: {
        output: {
            library: "pageVue",
            libraryTarget: "window",
            libraryExport: 'default'
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
        ],
        externals: {
            vue: 'Vue'
        }
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
