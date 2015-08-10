'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var path = require('path');
var fs = require('fs');
var data = require('gulp-data');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");

/**
 * 把jade编译成html，编译过程会寻找对应名字的json文件
 */
gulp.task('templates', function() {
    return gulp.src('srcs/jade/*.jade')
        .pipe(plumber())
        .pipe(data(function(file) {
            var json = JSON.parse(fs.readFileSync('srcs/json/' + path.basename(file.path, '.jade') + '.json'));
            return json;
        }))
        .pipe(jade({
            pretty: '    '
        }))
        .pipe(gulp.dest('builds'));
});

/**
 * 监听jade的任务需要跟编译的分开
 */
gulp.task('jade-watch', ['templates'], reload);

/**
 * 把scss编译成css
 */
gulp.task('sass', function() {
    return gulp.src("srcs/scss/*.scss")
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .on('error', function(err) {})
        .pipe(gulp.dest("builds/css"))
        .pipe(reload({
            stream: true
        }));
});

/**
 * 压缩js和css
 */
gulp.task('jimin', function() {
    return gulp.src('builds/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('builds/compressed/js'));
});
gulp.task('cssmin', function() {
    gulp.src('builds/css/*.css')
        .pipe(uglifycss())
        .pipe(rename(function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('builds/compressed/css'));
});

/**
 * 启动服务器，进行监听
 */
gulp.task('default', ['sass', 'templates'], function() {

    browserSync({
        server: 'builds'
    });

    gulp.watch('srcs/scss/*.scss', ['sass']);
    gulp.watch('srcs/jade/**/*.jade', ['jade-watch']);
    gulp.watch('srcs/json/*.json', ['jade-watch']);
});
