'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const inlineSource = require('gulp-inline-source');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gutil = require('gulp-util');

gulp.task('build', ['clean', 'lint', 'setup'], () => {
    return Promise.all([
        new Promise((resolve, reject) => {
            gutil.log('Building javascript');
            gulp
                .src('src/index.js')
                .pipe(browserify())
                .pipe(uglify())
                .pipe(concat('bundle.js'))
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Copying .htaccess, sitemap.xml, robots.txt');
            gulp
                .src([
                    'src/.htaccess',
                    'src/*.xml',
                    'src/*.txt'])
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Copying images');
            gulp
                .src('src/**/*.{png,jpg}')
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Minifying html');
            gulp
                .src('src/**/*.html')
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Minifying component CSS');
            gulp
                .src('src/components/**/*.css')
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest('dist/components'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Minifying unbundled shared CSS');
            gulp
                .src('src/shared/styles/unbundled/*.css')
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest('dist/shared/styles/unbundled'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Minifying/bundling shared CSS');
            gulp
                .src('src/shared/styles/*.css')
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/shared/styles'))
                .on('end', resolve);
        })
    ]).then(() => {
        return new Promise((resolve, reject) => {
            gutil.log('Inlining js/css/images into the html');
            gulp
                .src('dist/*.html')
                .pipe(inlineSource())
                .pipe(gulp.dest('dist'))
                .on('end', () => {
                    gutil.log('Versioning filenames for cache busting');
                    gulp
                        .src([
                            'dist/**/*.html',
                            'dist/**/*.css',
                            'dist/**/*.js',
                            'dist/**/*.{jpg,png,jpeg,gif,svg}'])
                        .pipe(gulpif('!index.html', rev())) // Rename files except for index.html
                        .pipe(revReplace()) // Replace within each file any references to files that got renamed
                        .pipe(gulp.dest('dist'))
                        .on('end', resolve);
                });
        });
    });
});
