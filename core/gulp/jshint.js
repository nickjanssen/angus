'use strict';

var jshint  = require('gulp-jshint');
var playSound = require('../playSound.js');

module.exports = function (angus, gulp) {
    return function () {
        return gulp.src([
                angus.appPath + '/src/core/**/*.js',
                '!' + angus.appPath + '/src/core/**/_*.js'
            ])
            .pipe(jshint(angus.appPath + '/.jshintrc'))
            .pipe(jshint.reporter(function () {
                playSound('break');
            }))
            .pipe(jshint.reporter(require('jshint-stylish')));
    };
};
