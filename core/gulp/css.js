'use strict';

var streams = require('../streams');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

module.exports = function (angus, gulp) {
    return function () {
        return streams.css(angus, gulp)
        .pipe(angus.env === 'prod' ? concat('main.css') : gutil.noop())
        .pipe(gulp.dest(angus.appPath + '/dist/assets'));
    };
};
