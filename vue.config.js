const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://139.198.104.58:8200/',
    //     changeOrigin: true
    //   }
    // }
  }
})
