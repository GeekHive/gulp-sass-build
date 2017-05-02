const autoprefixer = require('gulp-autoprefixer');
const console = require('console');
const cssmin = require('gulp-cssmin');
const gutil = require('gulp-util');
const path = require('path');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const yargs = require('yargs').argv;

const isObject = a => typeof a === 'object';

class SassBuild {
    constructor(src, dest, gulp) {
        this._src = src;
        this._destinations =
            Array.isArray(dest)
                ? dest
                : [dest];

        this._verbose = yargs.verbose;
        this._gulp = gulp;

        this.build = this.build.bind(this);
        this.watch = this.watch.bind(this);
    }

    build(sassOptions, cssMinOptions) {
        const stream = this._gulp.src(this._src)
            .pipe(sass(
                isObject(sassOptions) ? sassOptions : undefined
            ))
            .pipe(autoprefixer())
            .pipe(this._verbose
                ? gutil.noop()
                : cssmin(
                    isObject(cssMinOptions) ? cssMinOptions : { advanced: false }
                )
            );

        return this._destinations
            .reduce(
                (str, dest) =>
                    str
                        .pipe(rename(path.basename(dest)))
                        .pipe(this._gulp.dest(path.dirname(dest))),
                stream);
    }

    watch() {
        watch(path.join(path.dirname(this._src), '**/*.s[ac]ss'), () => {
            const src = gutil.colors.cyan(this._src);
            gutil.log(`Rebuilding '${src}'...`);
            this.build();
        });
        this.build();
    }
}

module.exports = SassBuild;