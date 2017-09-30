'use strict';

const gulp = require('gulp');
const fs = require('fs');
const rename = require('gulp-rename');

gulp.task('setup', [], (done) => {
    if (fs.existsSync('./data.json')) {
        done();
    } else {
        // browserify would fail if the data.json file does not exist, so create it before building
        gulp
            .src('data-example.json')
            .pipe(rename('data.json'))
            .pipe(gulp.dest('.'))
            .on('end', done);
    }
});
