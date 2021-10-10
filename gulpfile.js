const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const { series } = require('gulp');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function style() {
  return gulp.src('./app/assets/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/assets/styles/'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    startPath: './app/index.html'
  });
  gulp.watch('./app/assets/styles/**/*.scss', style);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./app/assets/scripts/**/*.js').on('change', browserSync.reload);
}

function cleanDist() {
  return del('./dist');
}

function minify() {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
}

function copyOtherAssets() {
  return gulp.src([
    './app/assets/**/*',
    '!./app/assets/images/icon-font/**',
    '!./app/assets/scripts/**',
    '!./app/assets/styles/**',
  ])
    .pipe(gulp.dest('./dist/assets/'));
}

exports.style = style;
exports.watch = series(style, watch);
exports.build = series(cleanDist, minify, copyOtherAssets);
