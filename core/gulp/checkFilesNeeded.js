'use strict';

var fs = require('fs');
var path = require('path');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');

module.exports = function (angus) {
    return function (cb) {

        gutil.log(gutil.colors.yellow('Checking if any library includes are missing...'));

        // Check that all libIncludes given for this app exist
        var files = [];

        var filesNotFound = [];

        files.concat(angus.appConfig.bower.filesNeeded.js,
            angus.appConfig.bower.filesNeeded.html.map(function (tpl) {
                return tpl.libPath;
            }),
            angus.appConfig.bower.filesNeeded.scss,
            angus.appConfig.bower.filesNeeded.css,
            angus.appConfig.bower.filesNeeded.less)
            .forEach(function (file) {
                if (!fs.existsSync(angus.appPath + '/bower_components/' + file)) {
                    filesNotFound.push(file);
                }
            });

        angus.appConfig.bower.filesNeeded.scss.forEach(function (file, index, arr) {
            // Sass does not support the raw inclusion of CSS files
            // https://github.com/sass/sass/issues/193
            // If we are trying to include one, quickly create a SCSS variant and change
            // the extension of the file in our includes list to SCSS.
            if (path.extname(file) === '.css') {
                arr[index] = path.join(path.dirname(file), path.basename(file, '.css') + '.scss');
                fs.writeFileSync(angus.appPath + '/bower_components/' + arr[index], fs.readFileSync(angus.appPath + '/bower_components/' + file));
            }
        });

        if (filesNotFound.length) {
            gutil.log(gutil.colors.bgRed('angus.config.js [bower.filesNeeded] files missing! '));
            filesNotFound.forEach(function (file) {
                gutil.log(gutil.colors.red('bower_components/' + file + ''));
            });
            playSound('break');
            setTimeout(process.exit, 100);
        }
        else {
            gutil.log(gutil.colors.green('All library includes were found.'));
            cb();
        }
    };
};
