'use strict';

var replace = require('gulp-replace');
var connect = require('gulp-connect');
var walkDir = require('walkdir');
var path = require('path');

module.exports = function (angus, gulp) {

    var autoInclude = {
        css: '',
        jsLib: '',
        jsApp: ''
    };

    walkDir.sync(angus.appPath + '/dist/assets/', {
        'max_depth': 1
    }, function (filePath) {
        if (path.extname(filePath) === '.css') {
            filePath = filePath.replace(angus.appPath + '/dist/', '');
            autoInclude.css += '<link rel="stylesheet" type="text/css" href="' + filePath + '">\n    ';
        }
    });

    // We could also walk the directory, but we want to make sure that the order of inclusion stays intact
    // so we make the script tags manually. If we are on prod, no need to include libraries as
    // these are already present inside main.css, which we already include below.
    if (angus.env !== 'prod') {
        autoInclude.jsLib = angus.appConfig.bower.filesNeeded.js
        .map(function (filePath) {
            filePath = 'js/bower_components/' + filePath;
            return '<script src="' + filePath + '"></script>';
        }).join('\n    ');
    }

    walkDir.sync(angus.appPath + '/dist/js/', function (filePath) {
        filePath = filePath.replace(angus.appPath + '/dist/', '');
        var folders = filePath.split(path.sep);
        if (path.extname(filePath) === '.js' &&
            folders[1] !== 'bower_components') {
            autoInclude.jsApp += '<script src="' + filePath + '"></script>\n    ';
        }
    });

    return function () {
        return gulp.src(angus.appPath + '/src/*.html')
            .pipe(replace(/<!-- autoInclude: css !-->/g, autoInclude.css))
            .pipe(replace(/<!-- autoInclude: jsLib !-->/g, autoInclude.jsLib))
            .pipe(replace(/<!-- autoInclude: jsApp !-->/g, autoInclude.jsApp))
            .pipe(gulp.dest(angus.appPath + '/dist'))
            .pipe(connect.reload());
    };
};
