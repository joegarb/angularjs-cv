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
var inlineSource = require('gulp-inline-source');
var browserSync = require('browser-sync').create();
var modRewrite  = require('connect-modrewrite');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

// This fastbuild version of build:js just skips minification for speed; otherwise it's the same as the build:js task
gulp.task('fastbuild:js', function() {
  // Bundle JS files
  return gulp.src([
    'src/index.js'
  ]).pipe(browserify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
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

// This fastbuild version of build:static just skips minification for speed; otherwise it's the same as the build:static task
gulp.task('fastbuild:static', function() {
  // Copy images
  gulp.src([
    'src/**/*.png'
  ]).pipe(gulp.dest('dist'));

  // Copy html
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));

  // Copy css that can't be bundled
  gulp.src('src/components/**/*.css')
    .pipe(gulp.dest('dist/components'));
  gulp.src('src/shared/styles/unbundled/*.css')
    .pipe(gulp.dest('dist/shared/styles/unbundled'));

  // Bundle and copy the main css
  return gulp.src('src/shared/styles/*.css')
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/shared/styles'));
});

gulp.task('build:static', function() {
  // Copy the .htaccess
  gulp.src('src/.htaccess')
    .pipe(gulp.dest('dist'));

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
  gulp.src('src/shared/styles/unbundled/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/shared/styles/unbundled'));

  // Bundle and minify the main css
  return gulp.src('src/shared/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/shared/styles'));
});

gulp.task('inline', function() {
  // Inline js/css/images in the html for faster loading
  return gulp.src('dist/*.html')
    .pipe(inlineSource())
    .pipe(gulp.dest('dist'));
});

gulp.task('init-browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      middleware: [
        // Mimic the rewrite rule in our .htaccess since that isn't used when the app is served up by browser-sync. Necessary for Angular HTML5 mode.
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    }
  })
});

gulp.task('browser-sync-reload', function() {
  browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.*').on('change', function() {
    runSequence('build:dev', 'browser-sync-reload');
  });
});

gulp.task('dev', function(callback) {
  runSequence(
    'clean',
    'lint',
    'build:dev',
    'init-browser-sync',
    'watch',
    callback
  );
});

gulp.task('build:dev', function(callback) {
  runSequence(
    'fastbuild:js',
    'fastbuild:static',
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'build:js',
    'build:static',
    'inline',
    callback
  );
});
