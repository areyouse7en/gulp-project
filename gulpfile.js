const gulp = require('gulp')
const pug = require('gulp-pug') // pug的编译
const sass = require('gulp-sass') // sass的编译
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer') // 自动添加css前缀
const cssnano = require('gulp-cssnano') // 压缩css
const babel = require('gulp-babel') // 编译ES6
const concat = require('gulp-concat') //合并js
const uglify = require('gulp-uglify') // 压缩js
const plumber = require('gulp-plumber') // 监控错误
const browserSync = require('browser-sync') // 服务器
const reload = browserSync.reload //自刷新

/*编译pug*/
gulp.task('views', () => {
    gulp.src('src/views/**.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest('builds'))
        .pipe(reload({ stream: true }))
})

/*编译scss*/
const supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 9',
    'ff >= 20',
    'ios 6',
    'android 4'
]

gulp.task('sass', () => {
    gulp.src('src/styles/**.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: supported, add: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('builds/css'))
        .pipe(reload({ stream: true }))
})

/*压缩css*/
gulp.task('cssmin', () => {
    gulp.src('src/styles/**.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano({
            autoprefixer: { browsers: supported, add: true }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('builds/dist'))
})

/*编译es6*/
gulp.task('es6', () => {
    gulp.src('src/scripts/**.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-2'],
            plugins: ['transform-runtime']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('builds/js'))
        .pipe(reload({ stream: true }))
})

/*压缩js*/
gulp.task('jsmin', () => {
    gulp.src('src/scripts/**.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-2'],
            plugins: ['transform-runtime']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('builds/dist'))
})

// 开发
gulp.task('default', ['views', 'sass', 'es6'], () => {
    //指定服务器启动目录
    browserSync.init({ server: 'builds' })

    // 监听
    gulp.watch('src/views/**.pug', ['views'])
    gulp.watch('src/styles/*.scss', ['sass'])
    gulp.watch('src/scripts/**.js', ['es6'])
})

// 生产
gulp.task('build', ['cssmin', 'jsmin'])
