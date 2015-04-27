'use strict';

var gulp = require('gulp'),
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

gulp.task('server', function() {
	var files = [
		'builds/*.html',
		'builds/js/*.js',
		'builds/css/*.css',
		'builds/images/*'
	];
	browserSync.init(files, {
		server: 'builds'
	});
});

gulp.task('compass', function() {
	gulp.src('srcs/scss/*.scss')
		.pipe(watch('srcs/scss/*.scss'))
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
		.on('error', function(err) {})
		.pipe(gulp.dest('builds/css'));
});

gulp.task('default', ['server', 'compass']);
