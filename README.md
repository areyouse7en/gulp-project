# gulp-project
> 用gulp快速搭建你的前端开发环境，使用Pug模板引擎，scss预编译语言

![gulp](http://images.cnitblog.com/i/36987/201405/111519280268938.jpg) 

---
##### 用法
1. 安装node（如果被墙，可用[镜像](http://npm.taobao.org/) ）、ruby（[镜像](https://gems.ruby-china.org/) ）
2. Clone项目到本地，打开终端，cd到项目目录
3. 全局安装gulp和bower（cnpm install gulp bower -g）
4. `cnpm install`  安装node依赖包
5. `bower install`  安装node依赖包
6. `gulp` 启动环境，愉快地工作吧~

---
##### 任务
| command | description |
| ------------- | ------------- |
| `gulp templates` | 编译pug，可以在config.json里配置一些全局变量|
| `gulp compass` | 编译scss |
| `gulp compress` | 压缩js和css |
| `gulp` | 默认任务，启动服务器，监听jade、scss、js文件的变化，自动刷新浏览器 |

---
##### 结构
| filename | details |
| ------------- | ------------- |
| srcs | 源文件，pug、scss、json |
| builds | 输出目录 html、css、js等 |
| gulpfile.js | 主程序 |
| package.json | node依赖包 |
| bower.json | 库依赖包 |
| .bowerrc | bower配置文件 |
| config.rb | compass配置文件 |
| .gitignore | git提交配置文件 |

---
##### 扩展
- [Gulp中文网](http://www.gulpjs.com.cn/) 
- [Pug中文网](https://github.com/pugjs/pug/blob/master/Readme_zh-cn.md) 
- [Compass常用方法](https://github.com/areyouse7en/compass-usage/blob/master/CSS3) 
- [Bower官网](http://bower.io/search/) 
