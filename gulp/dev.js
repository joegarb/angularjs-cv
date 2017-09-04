'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const modRewrite = require('connect-modrewrite');

gulp.task('dev', ['build-dev'], () => {
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
    });

    return gulp.watch('./src/**/*.*').on('change', () => {
        runSequence(
            'build-dev',
            () => {
                browserSync.reload();
            }
        );
    });
});
