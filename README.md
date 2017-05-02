# GeekHive Gulp Sass Build

A simplified, standardized, gulp-compatible build script to bundle a source file using Sass, Autoprefixer, and CSSMin.

## Installation

Using NPM

```sh
npm install geekhive/gulp-sass-build --save-dev
```

Using yarn

```sh
yarn add geekhive/gulp-sass-build --dev
```

## Usage

Require `@geekhive/gulp-sass-build` to access the build class.

```js
const SassBuild = require('@geekhive/gulp-sass-build');
```

## `new SassBuild(src, dest, gulp)`

Create a new `SassBuild` object by passing it source and destination paths for the file to compile as well as a reference to `gulp`.

```js
const css = new SassBuild(
    `${__dirname}/assets/sass/site.scss`,
    `${__dirname}/assets/css/site.min.css`,
    gulp);
```

The `dest` argument may also be an array of destinations.

```js
const css = new SassBuild(
    `${__dirname}/assets/sass/site.scss`,
    [
        `${__dirname}/assets/css/site.min.css`,
        `${__dirname}/assets/example/alternative.css`
    ],
    gulp);
```

## `SassBuild#build(sassOptions, cssMinOptions)`

The `SassBuild#build` method can be passed directly to gulp as a build task:

```js
gulp.task('build:css', css.build);
```

Both [`sassOptions`](https://github.com/sass/node-sass#options) and [`cssMinOptions`](https://github.com/jakubpawlowicz/clean-css) parameters are optional.

```js
const sassOptions = './sassOptions';
const cssMinOptions = './cssMinOptions';

gulp.task('build:css', () => css.build(sassOptions, cssMinOptions));
```

Calling `css.build` will compile the source file using Sass, Autoprefixer, and CSSMin. It will then output the result to the destination location.

## `SassBuild#watch()`

The `SassBuild#watch` method can be passed directly to gulp as a watch task:

```js
gulp.task('watch:css', css.watch);
```

Calling `css.watch` will start watching the source directory and subdirectories for changes and will recompile the CSS file when changes are made.