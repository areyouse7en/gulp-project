'use strict';
// requires
var gulp = require('gulp'),
	// browser-sync
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	// html
	jade = require('gulp-jade'),
	// js
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	// css
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	// util
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber');

// configure
var config = {
	paths: {
		src: {
			jade: 'src/templates/**/*.jade',
			scss: 'src/sass/**/*.scss',
			sass: 'src/sass',
			coffee: 'src/coffee/**/*.coffee'
		},
		builds: {
			html: 'builds/development',
			css: 'builds/development/css',
			css_min: 'builds/development/css/compressed',
			js: 'builds/development/js',
			js_min: 'builds/development/js/compressed'
		}
	},
	js_name: 'main.js',
	css_name: 'main.css'
}

// tasks
// ===========

// html
gulp.task('jade', function() {
	watch(config.paths.src.jade, function(files) {
		return files
			.pipe(plumber())
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest(config.paths.builds.html));
	});
});

// css
gulp.task('compass', function() {
	watch(config.paths.src.scss, function(files) {
		return files
			.pipe(plumber({
				errorHandler: function(error) {
					console.log(error.message);
					this.emit('end');
				}
			}))
			.pipe(compass({
				config_file: 'config.rb',
				css: config.paths.builds.css,
				sass: config.paths.src.sass
			}))
			.on('error', function(err) {
				// Would like to catch the error here
			})
			.pipe(gulp.dest(config.paths.builds.css));
	});
});

// js
gulp.task('coffee', function() {
	watch(config.paths.src.coffee, function(files) {
		return files
			.pipe(plumber())
			// .pipe(coffee().on('error', gutil.log))
			.pipe(coffee({
				bare: true
			}).on('error', gutil.log))
			.pipe(gulp.dest(config.paths.builds.js));
	});
});

// utils
gulp.task('compress', function() {
	gulp.src(config.paths.builds.js + '/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat(config.js_name))
		.pipe(gulp.dest(config.paths.builds.js_min));
	gulp.src(config.paths.builds.css + '/*.css')
		.pipe(minifyCSS())
		.pipe(concat(config.css_name))
		.pipe(gulp.dest(config.paths.builds.css_min));
})

// watch
gulp.task('watch', function() {
	watch([
		config.paths.builds.css + '/**/*.css',
		config.paths.builds.html + '/**/*.html',
		config.paths.builds.js + '/**/*.js'
	], function(files) {
		return files
			.pipe(browserSync.reload({
				stream: true
			}));
	});
});

// browser-sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "builds/development"
		}
	});
});

// default
gulp.task('default', ['jade', 'compass', 'coffee', 'browser-sync', 'watch']);
// gulp.task('default', ['compress']);