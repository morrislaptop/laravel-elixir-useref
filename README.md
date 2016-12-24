# Laravel-Elixir-Useref
>This is a simple wrapper around Laravel Elixir for Useref. 

## Why?

Personally I have some real problems with the scriptsIn() and the stylesIn() functions. Blindly combining files in an unspecified order is just asking for trouble:

* You might be including files you didn’t intend — I’m thinking a jquery.scroller.js and a jquery.scroller.min.js
* Files might be included in the wrong order — your app.js is loaded first before jquery.js and everything breaks

You need these files compiled in the same way they are loaded in your development environment. 

Read my article on the subject: [Laravel Elixir - Dev or Build Tasks](https://medium.com/@morrislaptop/laravel-elixir-for-dev-tasks-or-build-tasks-d5be30f16569)

## Getting Started
Install the module with [npm](https://npmjs.org):

```bash
$ npm install --save laravel-elixir-useref
```


And add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-useref');

elixir(function(mix) {
   mix.useref();
});
```

Then you just have to edit your php file(s) and some extra markup, like this:

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    
    <!-- build:css(public) css/all.css -->
    <link rel="stylesheet" href="bower_components/dropzone/dist/min/dropzone.min.css" />
    <link rel="stylesheet" href="css/app.css" />
    <!-- endbuild -->
</head>
<body>
    <!-- build:js(public) js/all.js -->
    <script src="bower_components/dropzone/dist/min/dropzone.min.js"></script>
    <script src="js/main.js"></script>
    <!-- endbuild -->
</body>
</html>
```

This will scan your asset dependencies in your `app.blade.php`, concat and minimise those files and put them in your public directory as `css/all.css` and `js/all.js` (you can change the name in the tag if you like). 

This tool is really powerful if you use [laravel-elixir-wiredep](https://github.com/FabioAntunes/laravel-elixir-wiredep) to inject your assets in:

    @if ( Config::get('app.debug') )
        <!-- build:css(public) css/all.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
    @else
        <link rel="stylesheet" href="{{ elixir("css/all.css") }}">
    @endif

Note: It will not replace the assets in your app.blade.php - you should check if you are in production / debug mode and output your compiled assets or your source assets:

    @if ( Config::get('app.debug') )
        <!-- build:js(public) js/all.js -->
        <script src="bower_components/jquery/dist/jquery.js"></script>
        <script src="js/main.js"></script>
        <!-- endbuild -->
    @else
        <script src="{{ elixir("js/all.js") }}"></script>
    @endif

Instead, if you only want to scan more all your .php files, you may do:

```javascript
mix.useref({src: false })
```


## Options
This wrapper accepts two objects for configuration, the first one is for the wrapper itself and the second one is for useref ([documentation](https://github.com/jonkemp/gulp-useref))

These are the default wrapper options:
```javascript
{
    baseDir: 'resources/views', // the folder for your views
    src: 'app.blade.php', // file to search, false to scan
    searchLevel: '**/*.php', //How many search levels you want
    minifyJs: true, //If you want to minimise the js files
    minifyCss: true //If you want to minimise the css files
}
```

## Example
This is an example of a Gulp file that runs wiredep to inject all our assets and then uses useref (searching in the public directory) to compile all the assets in `master.blade.php` :

```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-useref');

elixir(function(mix) {
    mix.wiredep().useref({src: 'master.blade.php'}, { searchPath: 'public' });
});
```
