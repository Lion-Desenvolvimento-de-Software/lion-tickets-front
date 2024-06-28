const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
    // devServer: {
    //   https: true
    // }
    resolve: {
      alias: {
        vue: '@vue/compat',
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].meta = {
        // Adicione a CSP aqui
        'http-equiv': { 'http-equiv': 'Content-Security-Policy', 'content': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://localhost:44360;" }
      }
      return args
    })
  }
})
