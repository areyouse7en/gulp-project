'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var path = require('path');
var fs = require('fs');
var data = require('gulp-data');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");

/**
 * 把pug编译成html，编译过程会寻找对应名字的json文件
 */
gulp.task('templates', function() {
    return gulp.src('srcs/pug/*.pug')
        .pipe(plumber())
        .pipe(data(function(file) {
            var json = JSON.parse(fs.readFileSync('srcs/json/config.json'));
            return json;
        }))
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest('builds'));
});

/**
 * 把scss编译成css
 */
gulp.task('compass', function() {
    return gulp.src('srcs/scss/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(compass({
            css: 'builds/css',
            sass: 'srcs/scss'
        }))
        .on('error', function(err) {
            // Would like to catch the error here 
        })
        .pipe(gulp.dest('builds/css'))
});

/**
 * 监听任务需要跟编译的分开
 */
gulp.task('pug-watch', ['templates'], reload);
gulp.task('scss-watch', ['compass'], reload);

/**
 * 压缩js和css
 */
gulp.task('jsmin', function() {
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
gulp.task('compress', ['jsmin', 'cssmin']);

/**
 * 启动服务器，进行监听
 */
gulp.task('default', ['compass', 'templates'], function() {

    browserSync({
        server: 'builds'
    });

    gulp.watch('srcs/scss/*.scss', ['scss-watch']);
    gulp.watch('srcs/pug/**/*.pug', ['pug-watch']);
    gulp.watch('srcs/json/*.json', ['pug-watch']);
    gulp.watch('builds/js/**.js', reload);
});
