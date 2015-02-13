# Laravel-Elixir-Useref
>This is a simple wrapper around Laravel Elixir for Useref. 

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

This tool is really powerful if you use (laravel-elixir-wiredep)[https://github.com/FabioAntunes/laravel-elixir-wiredep] to inject your assets in:

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
        <link rel="stylesheet" href="{{ elixir("js/all.js") }}">
    @endif

Instead, if you only want to scan more all your .php files, you may do:

```javascript
mix.useref({src: false })
```


## Options
This wrapper accepts one object for configuration.

These are the default wrapper options:
```javascript
{
    baseDir: 'resources/views', // the folder for your views
    src: 'app.blade.php', // file to search, false to scan
    searchLevel: '**/*.php' //How many search levels you want
}
```

## Example
This is an example of a Gulp file that runs wiredep and then compiles all the assets in `master.blade.php`:

```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-useref');

elixir(function(mix) {
    mix.wiredep().useref({src: 'master.blade.php'});
});
```