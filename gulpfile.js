var gulp = require('gulp'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    del = require('del'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build:js', function() {
  // Bundle JS files
  // todo: cache busting
  return gulp.src([
    'src/js/app.js'
  ]).pipe(browserify())
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
  ]).pipe(gulp.dest('dist'));
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
    'build:js',
    'build:htaccess',
    'build:static',
  done)
});

gulp.task('default', ['build']);