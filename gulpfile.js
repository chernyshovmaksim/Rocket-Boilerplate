const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

const del = require('del');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

function clean(cb) {
    return del(['./build/**', '!./build']);
    cb();
}

function server(cb) {
    return bs.init({
        server: {
            baseDir: './build'
        }
    });
    cb();
}

function sassToCss(cb) {
    return src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./src/css'));
    cb();
}

function copyCss(cb) {
    return src('./src/css/*.css')
        .pipe(dest('./build/css'));
    cb();
}

function copyHtml(cb) {
    return src('./src/*.html')
        .pipe(dest('build'));
    cb();
}

function copyImages(cb) {
    return src('./src/img/**/*.{jpg, png, gif}')
        .pipe(dest('./build/img/'));
    cb();
}

function javascript(cb) {
    return src([
            './src/js/libs/jquery-3.5.1.min.js',
            './src/js/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(dest('./build/js/'));
    cb();
}



//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////




function watcher(cb) {
    watch('./src/js/**/*', javascript);
    watch('./src/sass/**/*', sassToCss);
    watch('./src/css/*', copyCss);
    watch('./src/img/**/*', copyImages);
    watch('./src/*.html', copyHtml);
    watch('./build/**/*').on('change', bs.reload);
    cb();
}

function build(cb) {
    cb();
}

exports.default = build;

exports.dev = series(
    clean,
    sassToCss,
    copyCss,
    javascript,
    copyHtml,
    copyImages,
    parallel(
        server,
        watcher
    )
);