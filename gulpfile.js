const {
    dest
} = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const nunjucks = require('gulp-nunjucks');
const nunjucksRender = require('gulp-nunjucks-render');
const beautify = require('gulp-beautify-code');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const lineec = require('gulp-line-ending-corrector');


function buildStyleCss() {
    return gulp.src('./app/assets/style/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/style'))
}

function buildTemplate() {
    return gulp.src('./app/**/*.njk')
        .pipe(nunjucksRender({
            path: ['app/**/*.njk']
        }))
        .pipe(beautify({
            indent_size: 2,
            indent_char: ' ',
            max_preserve_newlines: 0,
            unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
        }))
        .pipe(gulp.dest('./dist'))
}

function importImages() {
    return gulp.src('./app/assets/image/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/image'))
}

function importJsFile() {
    return gulp.src('./app/assets/js/**/*')
        .pipe(changed('./dist/assets/js'))
        .pipe(beautify())
        .pipe(lineec())
        .pipe(gulp.dest('./dist/assets/js'));
}



const build = gulp.series(buildStyleCss, buildTemplate, importImages, importJsFile);

exports.buildTemplate = buildTemplate
exports.buildStyleCss = buildStyleCss;
exports.importImages = importImages;
exports.importJsFile = importJsFile
exports.default = build;