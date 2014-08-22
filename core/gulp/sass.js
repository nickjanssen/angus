'use strict';

var sass = require('gulp-sass');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');

module.exports = function (angus, gulp) {
    return function () {
        return gulp.src(angus.appPath + '/src/style/main.scss')
            .pipe(plumber(function (err) {
                gutil.log(gutil.colors.red('SASS: ') + gutil.colors.red(err.message));
                playSound('break');
                this.emit('end');
            }))
            .pipe(sass())
            .pipe(angus.env === 'prod' ? minifyCSS() : gutil.noop())
            .pipe(gulp.dest(angus.appPath + '/dist/assets'))
            .pipe(connect.reload());
    };
};
