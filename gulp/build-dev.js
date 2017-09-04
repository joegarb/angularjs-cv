'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const gutil = require('gulp-util');

// Similar to the production build task, but without a few things like minification
gulp.task('build-dev', ['clean', 'lint'], () => {
    return Promise.all([
        new Promise((resolve, reject) => {
            gutil.log('Building javascript');
            gulp
                .src('src/index.js')
                .pipe(browserify())
                .pipe(concat('bundle.js'))
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
            gutil.log('Copying html');
            gulp
                .src('src/**/*.html')
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Copying component CSS');
            gulp
                .src('src/components/**/*.css')
                .pipe(gulp.dest('dist/components'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Copying unbundled shared CSS');
            gulp
                .src('src/shared/styles/unbundled/*.css')
                .pipe(gulp.dest('dist/shared/styles/unbundled'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gutil.log('Bundling shared CSS');
            gulp
                .src('src/shared/styles/*.css')
                .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/shared/styles'))
                .on('end', resolve);
        })
    ]);
});
