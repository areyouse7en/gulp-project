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

/**
 * Read the Json file and compile Jade files into HTML
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
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

/**
 * Sass task for live injecting into all browsers
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
        .on('error', function(err) {
            // Would like to catch the error here 
        })
        .pipe(gulp.dest("builds/css"))
        .pipe(reload({
            stream: true
        }));
});

/**
 * Serve and watch the scss/jade files for changes
 */
gulp.task('default', ['sass', 'templates'], function() {

    browserSync({
        server: 'builds'
    });

    gulp.watch('srcs/scss/*.scss', ['sass']);
    gulp.watch('srcs/jade/*.jade', ['jade-watch']);
    gulp.watch('srcs/json/*.json', ['jade-watch']);
});
