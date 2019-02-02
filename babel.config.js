module.exports = {
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            targets: '> 0.25%, not dead' // Support for lower than android 6
        }]
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}