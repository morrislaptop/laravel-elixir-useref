var path = require('path');
var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var util = require('gulp-util');
var $ = require('gulp-load-plugins')();

var Task = Elixir.Task;

Elixir.extend('useref', function(config, opts) {

    config = config || {};
    opts = opts || {};

    config.baseDir = config.baseDir || 'resources/views';
    config.src = config.src || false;
    config.searchLevel = config.searchLevel || '**/*.php';
    config.outputDir = config.outputDir || 'public';
    config.minifyJs = 'minifyJs' in config ? !!config.minifyJs : true;
    config.minifyCss = 'minifyCss' in config ? !!config.minifyCss : true;

    new Task('useref', function() {

        var src = path.join(config.baseDir, !!config.src ? config.src : config.searchLevel);
        var assets = $.useref.assets(opts);

        return gulp.src(src)
            .pipe(assets)
            .pipe(config.minifyJs ? $.if('./*.js', $.uglify()) : util.noop())
            .pipe(config.minifyCss ? $.if('./*.css', $.csso()) : util.noop())
            .pipe(gulp.dest(config.outputDir))
            .pipe($.size());
    });

});
