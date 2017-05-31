# gulp-project
> 用gulp快速搭建你的前端开发环境（es6，scss，pug，browser-sync）
> 适合轻巧的小项目，对学习前端脚手架有不少帮助

![gulp](http://images.cnitblog.com/i/36987/201405/111519280268938.jpg) 

---
##### Quick Start
1. 安装node（如果被墙，可用[镜像](http://npm.taobao.org/) ）
2. `npm install`  安装node依赖包
3. `gulp` 启动开发环境，愉快地工作吧~
4. `gulp build` 生产环境，压缩代码

---
##### gulpfile设置
1. 默认使用pug，scss和babel
2. 目录分src源目录，dev开发目录和dist生产目录(压缩css和js)
3. browserSync可按需设置，默认自刷新，开启日志输出
4. proxy代理也按需设置，根据规则匹配就好了

---
##### 参考
- [Gulp中文网](http://www.gulpjs.com.cn/) 
- [BrowserSync](https://browsersync.io) 
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 
