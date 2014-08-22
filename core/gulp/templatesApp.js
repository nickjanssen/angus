'use strict';

var streams = require('../streams');

module.exports = function (angus, gulp) {
    return function () {
        return streams.templatesApp(angus, gulp)
            .pipe(gulp.dest(angus.appPath + '/dist/js/html2js'));
    };
};
