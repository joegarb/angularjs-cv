var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var eslint = require('gulp-eslint');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build:js', function() {
  // Bundle JS files
  // todo: cache busting
  return gulp.src([
    'src/js/app.js'
  ]).pipe(browserify())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:htaccess:prod', function() {
  // Use the production version of the .htaccess
  gulp.src('src/.htaccess.production')
    .pipe(rename('.htaccess'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:htaccess', function() {
  // Just copy the .htaccess since it is already the dev/staging version
  gulp.src('src/.htaccess')
    .pipe(gulp.dest('dist'));
});

gulp.task('build:static', function() {
  // Copy static content to the output folder
  gulp.src([
    'src/**',
    // Exclude JS files already bundled and copied
    '!src/js{,/**}',
    // Exclude HTML files which get minified below
    '!src/**/*.html',
  ]).pipe(gulp.dest('dist'));

  // Minify html
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:prod', (done) => {
  runSequence(
    'clean',
    'build:js',
    'build:htaccess:prod',
    'build:static',
  done)
});

gulp.task('build', (done) => {
  runSequence(
    'clean',
    'lint',
    'build:js',
    'build:htaccess',
    'build:static',
  done)
});

gulp.task('default', ['build']);