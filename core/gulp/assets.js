'use strict';

module.exports = function (angus, gulp) {
    return function () {
        return gulp.src(angus.appPath + '/src/assets/**/*', {
            base: angus.appPath + '/src/'
        })
            .pipe(gulp.dest(angus.appPath + '/dist'));
    };
};
