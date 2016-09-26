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
var inlinesource = require('gulp-inline-source');

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
    'src/index.js'
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
	// Copy sitemap.xml and robots.txt
	gulp.src([
		'src/*.xml',
		'src/*.txt'
	]).pipe(gulp.dest('dist'));

  // Copy images
  gulp.src([
    'src/**/*.png'
  ]).pipe(gulp.dest('dist'));

  // Minify html
  gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

  // Minify css that can't be bundled
  gulp.src('src/components/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/components'));
  gulp.src('src/shared/styles/specific/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/shared/styles/specific'));

  // Bundle and minify the main css
  return gulp.src('src/shared/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/shared/styles'));
});

gulp.task('inline', function() {
  // Inline js/css/images in the html for faster loading
  return gulp.src('dist/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:prod', (done) => {
  runSequence(
    'clean',
    'build:js',
    'build:htaccess:prod',
    'build:static',
    'inline',
  done)
});

gulp.task('build', (done) => {
  runSequence(
    'clean',
    'lint',
    'build:js',
    'build:htaccess',
    'build:static',
    //'inline',
  done)
});

gulp.task('default', ['build']);