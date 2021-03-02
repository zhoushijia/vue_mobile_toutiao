module.exports = {
  devServer: {
    proxy: {
      // 以app开头的接口  都走这里
      '/app': {
        target: 'http://toutiao-app.itheima.net/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  }
}
