/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

console.log(process.env.NODE_ENV)

const config = {
  NODE_ENV: process.env.NODE_ENV,
  VUE_APP_API_SERVER: '/v2/'
}
// 使用node的模块
module.exports = {
  // 这就是我们项目编译的入口文件
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },
  resolve: {
    extensions: ['.ts', 'tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@root': path.resolve(__dirname, '../../')
    }
  },
  // 这里可以配置一些对指定文件的处理
  // 这里匹配后缀为ts或者tsx的文件
  // 使用exclude来排除一些文件
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 这个参数就可以在webpack中获取到了
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    // 这个本地开发环境运行时是基于哪个文件夹作为根目录
    contentBase: './dist',
    // 当你有错误的时候在控制台打出
    stats: 'errors-only',
    // 不启动压缩
    compress: false,
    host: 'localhost',
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

    },
    port: 8080
  },
  // 这里就是一些插件
  plugins: [
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(config) }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
