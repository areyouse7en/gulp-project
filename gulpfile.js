const gulp = require('gulp')
const pug = require('gulp-pug') // pug的编译
const sass = require('gulp-sass') // sass的编译
const sourcemaps = require('gulp-sourcemaps') // 源码追踪
const autoprefixer = require('gulp-autoprefixer') // 自动添加css浏览器兼容的前缀
const cssnano = require('gulp-cssnano') // 压缩css
const babel = require('gulp-babel') // 编译ES6
const concat = require('gulp-concat') //合并js
const uglify = require('gulp-uglify') // 压缩js
const plumber = require('gulp-plumber') // 管道工，报错不停止服务
const browserSync = require('browser-sync') // 提供多端同步的服务器 https://browsersync.io/docs/options
const reload = browserSync.reload // 自刷新
const proxy = require('http-proxy-middleware') //代理中间件 https://github.com/chimurai/http-proxy-middleware

/*项目目录，按需设置*/
// 源目录
const srcPath = 'src/'
const srcPathHtml = srcPath + 'views/'
const srcPathCss = srcPath + 'styles/'
const srcPathJs = srcPath + 'scripts/'

// 开发目录
const devPath = 'dev/'
const devPathHtml = devPath
const devPathCss = devPath + 'css/'
const devPathJs = devPath + 'js/'

// 生产目录
const buildPath = 'dist/'
const buildPathHtml = buildPath
const buildPathCss = buildPath + 'css/'
const buildPathJs = buildPath + 'js/'

/*编译pug*/
gulp.task('views', () => {
    gulp.src(srcPathHtml + '**.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest(devPathHtml))
        .pipe(reload({ stream: true }))
})

/*编译scss*/
const browsersSupported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 9',
    'ff >= 20',
    'ios 6',
    'android 4'
]

gulp.task('sass', () => {
    gulp.src(srcPathCss + '*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: browsersSupported, add: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(devPathCss))
        .pipe(reload({ stream: true }))
})

/*压缩css*/
gulp.task('cssmin', () => {
    gulp.src(srcPathCss + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano({
            autoprefixer: { browsers: browsersSupported, add: true }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildPathCss))
})

/*编译es6*/
const babelOptions = {
    presets: ['es2015', 'stage-2'], //需要额外安装这几个babel-插件
    plugins: ['transform-runtime']
}

gulp.task('es6', () => {
    gulp.src(srcPathJs + '*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        // .pipe(concat('app.js')) // 合并为一个js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(devPathJs))
        .pipe(reload({ stream: true }))
})

/*压缩js*/
gulp.task('jsmin', () => {
    gulp.src(srcPathJs + '*.js')
        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        // .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildPathJs))
})

// 开发
gulp.task('default', ['views', 'sass', 'es6'], () => {

    //指定服务器启动目录
    browserSync.init({
        server: devPath, // 项目根目录
        serveStaticOptions: {
            extensions: ["html"] // 免去打html后缀
        },
        port: 3000, // 端口
        open: "ui", // 自动打开浏览器，地址默认localhost，可选external（用ip），ui（总操作台）
        logConnections: true, // cmd输出连接日志
        notify: false, // 右上角通知
        middleware: [ // 请求代理，按需设置
            proxy('/api', {
                target: 'http://op.juhe.cn', // 目标地址
                changeOrigin: true,
                ws: true, //websocket
                pathRewrite: {
                    '^/api': '' //重写地址
                }
            })
        ]
    })

    // 监听文件变化，并自刷新
    gulp.watch(srcPathHtml + '*.pug', ['views'])
    gulp.watch(srcPathCss + '*.scss', ['sass'])
    gulp.watch(srcPathJs + '*.js', ['es6'])
})

// 生产
gulp.task('build', ['cssmin', 'jsmin'])
