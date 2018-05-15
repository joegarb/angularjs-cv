'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const inlineSource = require('gulp-inline-source');
const filter = require('gulp-filter');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const revRewrite = require('gulp-rev-rewrite');
const revOutdated = require('gulp-rev-outdated');
const rimraf = require('rimraf');
const path = require('path');
const through = require('through2');
const log = require('fancy-log');
const PluginError = require('plugin-error');

gulp.task('build', ['setup'], () => {
    return Promise.all([
        new Promise((resolve, reject) => {
            log('Building javascript');
            gulp
                .src('src/index.js')
                .pipe(browserify())
                .pipe(uglify())
                .pipe(concat('bundle.js'))
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            log('Copying .htaccess, sitemap.xml, robots.txt');
            gulp
                .src([
                    'src/.htaccess',
                    'src/*.xml',
                    'src/*.txt'])
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            log('Copying images');
            gulp
                .src('src/**/*.{png,jpg}')
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            log('Minifying html');
            gulp
                .src('src/**/*.html')
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            log('Processing sass');
            gulp
                .src('src/**/*.scss')
                .pipe(sass({outputStyle: 'expanded', indentWidth: 4}))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/shared/styles'))
                .on('end', resolve);
        })
    ]).then(() => {
        return new Promise((resolve, reject) => {
            log('Inlining js/css/images into the html');
            gulp
                .src('dist/**/*.html')
                .pipe(inlineSource({rootpath: path.resolve('dist')}))
                .pipe(gulp.dest('dist'))
                .on('end', () => {

                    log('Cleaning old versioned files');
                    gulp
                        .src([
                            'dist/**/*.html',
                            'dist/**/*.css',
                            'dist/**/*.js',
                            'dist/**/*.{jpg,png,jpeg,gif,svg}'
                        ], {read: false})
                        .pipe(revOutdated(10)) // Keep the latest 10 versions of each file just to be super safe if people have index.html cached and referencing them
                        .pipe(cleaner())
                        .on('finish', () => {

                            log('Versioning modified files for cache busting');

                            const indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});
                            const revFilter = filter(['**/*', '!**/*-rev-*'], {restore: true});

                            gulp
                                .src([
                                    'dist/**/*.html',
                                    'dist/**/*.css',
                                    'dist/**/*.js',
                                    'dist/**/*.{jpg,png,jpeg,gif,svg}'
                                ])
                                .pipe(indexHtmlFilter)
                                .pipe(revFilter)
                                .pipe(rev()) // Rename modified files
                                .pipe(revFormat({prefix: '-rev-'}))
                                .pipe(revFilter.restore)
                                .pipe(indexHtmlFilter.restore)
                                .pipe(revRewrite()) // Replace within each file any references to files that got renamed
                                .pipe(gulp.dest('dist'))
                                .on('end', resolve);
                        });
                });
        });
    });
});

function cleaner() {
    return through.obj(function(file, enc, cb) {
        rimraf(path.resolve((file.cwd || process.cwd()), file.path), function(err) {
            if (err) {
                this.emit('error', new PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}
