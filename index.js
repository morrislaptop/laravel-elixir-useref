var path = require('path');
var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var $ = require('gulp-load-plugins')();

var Task = Elixir.Task;

Elixir.extend('useref', function(config, opts) {

    config = config || {};
    opts = opts || {};

    config.baseDir = config.baseDir || 'resources/views';
    config.src = config.src || false;
    config.searchLevel = config.searchLevel || '**/*.php';
    config.outputDir = config.outputDir || 'public';

    new Task('useref', function() {

        var src = path.join(config.baseDir, !!config.src ? config.src : config.searchLevel);
        var assets = $.useref.assets(opts);

        return gulp.src(src)
            .pipe(assets)
            .pipe($.if('*.js', $.uglify()))
            .pipe($.if('*.css', $.csso()))
            .pipe(gulp.dest(config.outputDir))
            .pipe($.size());
    });

});
