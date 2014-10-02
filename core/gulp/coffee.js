'use strict';

var streams = require('../streams');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

module.exports = function (angus, gulp) {
    return function () {
        return streams.coffeeApp(angus, gulp)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        // .pipe(angus.env === 'prod' ? concat('main.css') : gutil.noop())
        .pipe(gulp.dest(angus.appPath + '/dist/js'));
    };
};
