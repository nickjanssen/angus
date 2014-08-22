'use strict';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
// var order = require('gulp-order');

var streams = require('../streams');
var streamqueue = require('streamqueue');

module.exports = function (angus, gulp) {
    return function () {
        return streamqueue({ objectMode: true },
                streams.jsLib(angus, gulp),
                streams.jsApp(angus, gulp),
                streams.templatesLib(angus, gulp),
                streams.templatesApp(angus, gulp)
            )
            // .pipe(order([
            //     'bower_components/**/*',
            //     'core/**/*',
            //     // angus.appPath + '/src/**/*',
            // ]))
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest(angus.appPath + '/dist/js'));
    };
};
