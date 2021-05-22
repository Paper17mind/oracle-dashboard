const path = require('path')

module.exports = {
    publicPath: '/oracle/dashboard/',
    assetsDir: 'oracle/dashboard/',
    transpileDependencies: ['vuetify'],
    runtimeCompiler: true,
    // chainWebpack: (config) => {
    //     config.entry('app').clear().add('./warehouse/main.js').end()
    //     config.resolve.alias.set('@', path.join(__dirname, './warehouse'))
    // },
}