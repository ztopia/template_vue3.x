const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/mapi': {
        target: "http://devapis.luno.id", //测试服务器
        //target: 'http://10.30.31.222:8088', //本地服务器
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/mapi': '/'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: path.join(__dirname, 'src/components'),
        assets: path.join(__dirname, 'src/assets'),
        views: path.join(__dirname, 'src/views'),
        common: path.join(__dirname, 'src/common'),
        api: path.join(__dirname, 'src/request'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
