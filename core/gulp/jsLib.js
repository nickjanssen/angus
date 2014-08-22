'use strict';

var streams = require('../streams');

module.exports = function (angus, gulp) {
    return function () {
        return streams.jsLib(angus, gulp)
        .pipe(gulp.dest(angus.appPath + '/dist/js'));
    };
};
