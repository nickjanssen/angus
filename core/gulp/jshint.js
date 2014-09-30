'use strict';

var jshint  = require('gulp-jshint');
var playSound = require('../playSound.js');
var fs = require('fs');
var gutil = require('gulp-util');

module.exports = function (angus, gulp) {

    // If we cannot find a .jshintrc file, just use the one from the angus repo
    var jshintFilePath = angus.appPath + '/.jshintrc';

    if (!fs.existsSync(jshintFilePath)) {
        gutil.log(gutil.colors.yellow('No .jshintrc file found in the root folder of your app.'));
        gutil.log(gutil.colors.yellow('Using default angus jshint rules.'));
        jshintFilePath = '.jshintrc';
    }

    return function () {
        return gulp.src([
                angus.appPath + '/src/core/**/*.js',
                '!' + angus.appPath + '/src/core/**/_*.js'
            ])
            .pipe(jshint(jshintFilePath))
            .pipe(jshint.reporter(function () {
                playSound('break');
            }))
            .pipe(jshint.reporter(require('jshint-stylish')));
    };
};
