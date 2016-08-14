var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var eslint = require('gulp-eslint');
var cleanCSS = require('gulp-clean-css');

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
    .pipe(gulp.dest('dist/js'));
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
  // Copy images to the output folder
  gulp.src([
    'src/img{,/**}'
  ]).pipe(gulp.dest('dist'));

  // Minify html
  gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

  // Minify css that can't be bundled
  gulp.src('src/css/specific/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/specific'));

  // Bundle and minify the main css
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/css'));
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