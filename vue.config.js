const path = require('path')

module.exports = {
    publicPath: '/dashboard/',
    assetsDir: 'dashboard/',
    transpileDependencies: ['vuetify'],
    runtimeCompiler: true,
    // chainWebpack: (config) => {
    //     config.entry('app').clear().add('./warehouse/main.js').end()
    //     config.resolve.alias.set('@', path.join(__dirname, './warehouse'))
    // },
}