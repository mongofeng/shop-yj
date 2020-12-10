/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  parallel: false,

  publicPath: process.env.VUE_APP_BASE_URL,
  // outputDir: 'trial-student',
  productionSourceMap: false,

  devServer: {
    proxy: {
      '/wechatV2': {
        target: process.env.API,
        ws: true,
        changeOrigin: true,
        pathRewrite: { // 改变路径重定向
          '^/wechatV2': '/wechat'
        }
      },
      '/v2': {
        target: process.env.API,
        ws: true,
        changeOrigin: true,
        pathRewrite: { // 改变路径重定向
          '^/v2': '/'
        }
      }

    }
  },

  css: {
    loaderOptions: {
      sass: {
        // 会在所有的sass文件添加相同的代码，变量，mixins之类的，否则假设有20个文件被loader处理就有20个被导入，批量导入
        // 但在被import的文件里面不会的
        // eslint-disable-next-line quotes
        prependData: `@import '@root/common/assets/scss/variable.scss';`
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@root', path.resolve(__dirname, '../../'))
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  }

}
