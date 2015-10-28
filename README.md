# gulp-project
> 用gulp快速搭建你的前端开发环境，可以根据需要使用jade,coffee,scss等前端技术

![gulp](http://images.cnitblog.com/i/36987/201405/111519280268938.jpg) 

---
##### 用法
1. 安装node（如果被墙，可用[镜像](http://npm.taobao.org/) ）、ruby（[镜像](http://ruby.taobao.org/) ）
2. Clone项目到本地，打开终端，cd到项目目录
3. `npm install`  安装node依赖包
4. `gulp` 启动环境，愉快地工作吧~

---
##### 任务
| command | description |
| ------------- | ------------- |
| `gulp templates` | 编译jade，编译过程会寻找对应名字的json文件 |
| `gulp compass` | 编译scss |
| `gulp coffee` | 编译coffee |
| `gulp compress` | 压缩js和css |
| `gulp` | 默认任务，启动服务器，监听jade、scss、json文件的变化，自动刷新浏览器 |

---
##### 结构
| filename | details |
| ------------- | ------------- |
| srcs | 源文件，jade、scss、json、coffee |
| builds | 输出目录 html、css、js等 |
| gulpfile.js | 主程序 |
| package.json | node依赖包 |
| bower.json | 插件依赖包 |
| .bowerrc | bower配置文件 |
| config.rb | compass配置文件 |
| .gitignore | git提交配置文件 |

---
##### 扩展
- [Gulp中文网](http://www.gulpjs.com.cn/) 
- [Coffee中文网](http://coffee-script.org/) 
- [Jade中文网](https://github.com/jadejs/jade/blob/master/Readme_zh-cn.md) 
- [Compass常用方法](https://github.com/areyouse7en/compass-usage/blob/master/CSS3) 
- [Bower官网](http://bower.io/search/) 
