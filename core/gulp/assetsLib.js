'use strict';

var streams = require('../streams');

module.exports = function (angus, gulp) {
    return function () {
        return streams.assetsLib(angus, gulp)
        .pipe(gulp.dest(angus.appPath + '/dist/assets/'));
    };
};
