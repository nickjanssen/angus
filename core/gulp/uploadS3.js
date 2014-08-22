'use strict';

var s3 = require('gulp-s3');

module.exports = function (angus, gulp) {
    return function () {
        return gulp.src(angus.appPath + '/dist/**')
            .pipe(s3(angus.appConfig.aws));
    };
};
