'use strict';
// requires
var gulp = require('gulp'),
	// html
	jade = require('gulp-jade'),
	// css
	compass = require('gulp-compass'),
	// utils
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;



gulp.task('jade', function() {
	gulp.src('src/jade/**/*.jade')
		.pipe(watch('src/jade/**/*.jade'))
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('builds'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('compass', function() {
	gulp.src('src/*.scss')
		.pipe(watch('src/scss/**/*.scss'))
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(compass({
			css: 'builds/css',
			sass: 'src/scss'
		}))
		.pipe(gulp.dest('builds/css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', function() {
	gulp.src('builds/js/**/*.js')
		.pipe(watch('builds/js/**/*.js'))
		.pipe(plumber())
		.pipe(reload({
			stream: true
		}));
});

gulp.task('browser', function() {
	browserSync({
		server: {
			baseDir: "builds"
		}
	});
});

gulp.task('default', ['jade', 'compass', 'js', 'browser']);
