// vue.config.js
const path = require('path')

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      console.log(config)
    } else {
      // 为开发环境修改配置...
      // 只修改开发环境配置，打包会出现找不到定义的别名的错误，只在开发环境生效
      // return {
      //   resolve: {
      //     alias: {
      //       '@css': path.resolve(__dirname, './src/assets/css'),
      //       '@js': path.resolve(__dirname, './src/assets/js'),
      //       '@img': path.resolve(__dirname, './src/assets/imgs'),
      //       '@c': path.resolve(__dirname, './src/components')
      //     }
      //   }
      // }
    }
    return {
      resolve: {
        alias: {
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@img': path.resolve(__dirname, './src/assets/imgs'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    }
  },
  devServer: {
    proxy: 'http://api.imooc.hybrid.lgdsunday.club'
  }
}
