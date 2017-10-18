# GeekHive Gulp Sass Build

A simplified, standardized, gulp-compatible build script to bundle a source file using Sass, Autoprefixer, and CSSMin.

## Installation

Using NPM

```
npm install geekhive/gulp-sass-build --save-dev
```

Using yarn

```
yarn add geekhive/gulp-sass-build --dev
```

## Configuration

Optional configuration for processing steps can be defined in module's `package.json` from the key `SASSBuild`.  For example:

```js
{
    // ...
    "SASSBuild": {
        "sass": { ... }, // SASS options
        "autoprefixer": { ... }, // Autoprefixer options
        "cssmin": { ... } // CSSMin options
    },
    // ...
}
```

## Usage

Require `@geekhive/gulp-sass-build` to access the build class.

```
const SassBuild = require('@geekhive/gulp-sass-build');
```

## `new SassBuild(src, dest, gulp)`

Create a new `SassBuild` object by passing it source and destination paths for the file to compile as well as a reference to `gulp`.

```
const css = new SassBuild(
    `${__dirname}/assets/sass/site.scss`,
    `${__dirname}/assets/css/site.min.css`,
    gulp);
```

The `dest` argument may also be an array of destinations.

```
const css = new SassBuild(
    `${__dirname}/assets/sass/site.scss`,
    [
        `${__dirname}/assets/css/site.min.css`,
        `${__dirname}/assets/example/alternative.css`
    ],
    gulp);
```

## `SassBuild#build()`

The `SassBuild#build` method can be passed directly to gulp as a build task:

```
gulp.task('build:css', css.build);
```

Calling `css.build` will compile the source file using Sass, Autoprefixer, and CSSMin. It will then output the result to the destination location.

## `SassBuild#watch()`

The `SassBuild#watch` method can be passed directly to gulp as a watch task:

```
gulp.task('watch:css', css.watch);
```

Calling `css.watch` will start watching the source directory and subdirectories for changes and will recompile the CSS file when changes are made.