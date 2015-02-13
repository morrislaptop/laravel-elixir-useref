var gulp = require('gulp');
var elixir = require("laravel-elixir");
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var $ = require('gulp-load-plugins')();

elixir.extend('build', function(config) {

	var config = config || {};

	config.baseDir = config.baseDir || 'resources/views';
	config.src = 'src' in config ? config.src : 'app.blade.php';
	config.searchLevel = config.searchLevel || '**/*.php';
	config.outputDir = config.outputDir || 'public';

	var src = utilities.buildGulpSrc(config.src, config.baseDir, config.searchLevel);

	gulp.task('build', function() {

		var assets = $.useref.assets();

		return gulp.src(src)
			.pipe(assets)
			.pipe($.if('*.js', $.uglify()))
			.pipe($.if('*.css', $.csso()))
			.pipe(gulp.dest(config.outputDir))
			.pipe($.size());
	});

	return this.queueTask('build');

});
