'use strict';

const gulp = require('gulp');
const karma = require('karma');

/**
 * This is a workaround to avoid the node process sometimes hanging after gulp karma tasks have finished
 * https://github.com/karma-runner/karma/issues/1035
 * https://github.com/karma-runner/gulp-karma/issues/38
 */
function handleKarmaExit(exitCode, done) {
    if (exitCode === 0 || exitCode === null || typeof exitCode === 'undefined') {
        done();
    } else {
        done(new Error('Karma exited with code ' + exitCode));
    }
    process.exit(exitCode);
}

/***
 * Run tests in the console
 */
gulp.task('test', ['setup'], (done) => {
    new karma.Server(
        {
            configFile: __dirname + '/../karma.conf.js'
        },
        (exitCode) => {
            handleKarmaExit(exitCode, done);
        }
    ).start();
});

/**
 * Develop/Debug tests
 */
gulp.task('tdd', ['setup'], (done) => {
    new karma.Server(
        {
            configFile: __dirname + '/../karma.conf.js',
            singleRun: false,
            browsers: ['Chrome'],
            client: {
                mocha: {
                    timeout : 0
                }
            },
            browserNoActivityTimeout: 0
        },
        (exitCode) => {
            handleKarmaExit(exitCode, done);
        }
    ).start();
});
