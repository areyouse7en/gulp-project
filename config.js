const ROOT_SRC = 'src'
const ROOT_DEV = 'dev'
const ROOT_BUILD = 'dist'

module.exports = {
  // 端口号设置
  port: 9090,

  // 代理请求设置
  /* proxy: [
    proxy('/api', {
      target: 'http://op.juhe.cn', // 目标地址
      changeOrigin: true,
      ws: true, //websocket
      pathRewrite: {
        '^/api': '' //重写地址
      }
    })
  ], */

  rootSrc: ROOT_SRC,
  rootDev: ROOT_DEV,
  rootBuild: ROOT_BUILD,

  // 源文件的路径
  src: {
    html: ROOT_SRC + '/**/*.pug',
    css: ROOT_SRC + '/css/**/*.scss',
    js: ROOT_SRC + '/js/**/*.js',
    static: ROOT_SRC + '/static/**'
  },

  // 开发时的路径
  dev: {
    html: ROOT_DEV + '',
    css: ROOT_DEV + '/css/',
    js: ROOT_DEV + '/js/',
    static: ROOT_DEV + '/static/'
  },

  // 打包后的路径
  build: {
    html: ROOT_BUILD + '',
    css: ROOT_BUILD + '/css/',
    js: ROOT_BUILD + '/js/',
    static: ROOT_BUILD + '/static/'
  }
}