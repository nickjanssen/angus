'use strict';

var gutil = require('gulp-util');

module.exports = function () {
    return function (cb) {

        gutil.log(gutil.colors.yellow('Warning: angus.config.js was changed!'));
        gutil.log(gutil.colors.yellow('Please restart angus to do startup checks.'));

        cb();

    };
};
