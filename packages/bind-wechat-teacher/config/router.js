/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const router = {
  admin: {
    entry: path.resolve(__dirname, '../src/admin/main.ts'),
    html: {
    }
  },
  teacher: {
    entry: path.resolve(__dirname, '../src/teacher/main.ts'),
    html: {
    }
  }
}

// 路由配置
const entry = {}
const html = []

Object.keys(router).forEach((key) => {
  entry[key] = router[key].entry

  html.push({
    filename: key,
    chunks: [key]
  })
})

exports.entry = entry

exports.html = html
