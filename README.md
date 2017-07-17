# gulp-project
> 用gulp快速搭建你的前端开发环境（es6，scss，pug，browser-sync）
> 适合轻巧的小项目，对学习前端脚手架有不少帮助

---
#### Quick Start
1. 安装node（如果被墙，可用[镜像](http://npm.taobao.org/) ）
2. `npm install`  安装node依赖包
3. `gulp`或者`npm start` 启动开发环境
4. `gulp build`或者`npm run build` 生产环境，打包压缩

---
#### gulpfile配置
1. 默认使用pug和scss
2. 目录分src源目录，dev开发目录和dist生产目录(压缩css和js)
3. browserSync可按需设置，默认自刷新，开启日志输出
4. proxy代理也按需设置，根据规则匹配就好了

---
##### 参考
- [Gulp中文网](http://www.gulpjs.com.cn/) 
- [BrowserSync](https://browsersync.io) 
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 
