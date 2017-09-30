const gulp = require('gulp')
const watch = require('gulp-watch')
const del = require('del')
const pug = require('gulp-pug') // pug的编译
const sass = require('gulp-sass') // sass的编译
const sourcemaps = require('gulp-sourcemaps') // 源码追踪
const autoprefixer = require('gulp-autoprefixer') // 自动添加css浏览器兼容的前缀
const cssnano = require('gulp-cssnano') // 压缩css
const babel = require('gulp-babel') // 编译ES6
const uglify = require('gulp-uglify') // 压缩js
const plumber = require('gulp-plumber') // 管道工，报错不停止服务
const browserSync = require('browser-sync') // 提供多端同步的服务器 https://browsersync.io/docs/options
const reload = browserSync.reload // 自刷新
const proxy = require('http-proxy-middleware') //代理中间件 https://github.com/chimurai/http-proxy-middleware

/* 导入配置 */
const config = require('./config.js')
/* 环境：开发还是生产 */
let env = 'dev'

/*编译pug*/
gulp.task('compilePug', () => {
	if (env == 'dev') {
		return gulp.src(config.src.html)
			.pipe(watch(config.src.html))
			.pipe(plumber())
			.pipe(pug({
				pretty: '    '
			}))
			.pipe(gulp.dest(config.dev.html))
			.pipe(reload({
				stream: true
			}))
	} else {
		return gulp.src(config.src.html)
			.pipe(pug({
				pretty: '    '
			}))
			.pipe(gulp.dest(config.build.html))
	}
})

/* 编译scss */
const browsersSupported = [
	'last 2 versions',
	'safari >= 8',
	'ie >= 9',
	'ff >= 20',
	'ios 6',
	'android 4'
]

gulp.task('compileScss', () => {
	if (env == 'dev') {
		return gulp.src(config.src.css)
			.pipe(watch(config.src.css))
			.pipe(plumber())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: browsersSupported,
				add: true
			}))
			.pipe(gulp.dest(config.dev.css))
			.pipe(reload({
				stream: true
			}))
	} else {
		return gulp.src(config.src.css)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(cssnano({
				autoprefixer: {
					browsers: browsersSupported,
					add: true
				}
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.build.css))
	}
})

/* 编译js */
const babelOptions = {
	presets: ['env']
}

gulp.task('compileJs', () => {
	if (env == 'dev') {
		return gulp.src(config.src.js)
			.pipe(watch(config.src.js))
			.pipe(plumber())
			.pipe(babel(babelOptions))
			.pipe(gulp.dest(config.dev.js))
			.pipe(reload({
				stream: true
			}))
	} else {
		return gulp.src(config.src.js)
			.pipe(sourcemaps.init())
			.pipe(babel(babelOptions))
			.pipe(uglify())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.build.js))
	}
})

/* 静态文件直接移动，不作处理 */
gulp.task('copyStatic', () => {
	if (env == 'dev') {
		return gulp.src(config.src.static)
			.pipe(watch(config.src.static))
			.pipe(gulp.dest(config.dev.static))
	} else {
		return gulp.src(config.src.static)
			.pipe(gulp.dest(config.build.static))
	}
})

/* 执行一次 */
gulp.task('compileAll', () => {
	gulp.start('compilePug')
	gulp.start('compileScss')
	gulp.start('compileJs')
	gulp.start('copyStatic')
})

/* 启动服务 */
gulp.task('server', () => {
	browserSync.init({
		server: env == 'dev' ? config.rootDev : config.rootBuild, // 项目根目录
		port: config.port, // 端口
		open: true, // 自动打开浏览器，地址默认localhost，可选external（用ip），ui（总操作台）
		logConnections: true, // cmd输出连接日志
		notify: true, // 右上角通知
		middleware: config.proxy ? config.proxy : []
	})

	gulp.start('compileAll')
})


// 开发
gulp.task('default', () => {
	env = 'dev'
	del([config.rootDev]).then(() => {
		gulp.start('server')
	})
})

// 生产
gulp.task('build', () => {
	env = 'build'
	del([config.rootBuild]).then(() => {
		gulp.start('compileAll')
	})
})