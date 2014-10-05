'use strict';

var shell = require('shelljs');
var fs = require('fs');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = function (angus) {
    return function (cb) {

        gutil.log(gutil.colors.yellow('Installing Bower packages...'));

        var packageCommands = [];

        packageCommands.push('cd ' + angus.appPath);

        angus.appConfig.bower.packages
            .forEach(function (pkg) {

                var version = null;

                // Check if there is a version available
                if (pkg.indexOf('@') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('@');
                    pkg = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for tags
                else if (pkg.indexOf('#') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('#');
                    pkg = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for readAs packages using '='
                else if (pkg.indexOf('=') !== -1) {
                    var pkgArr = pkg.split('=');
                    pkg = pkgArr[0];
                    version = pkgArr[1];
                }

                if (fs.existsSync(angus.appPath + '/bower_components/' + pkg)) {
                    gutil.log(gutil.colors.magenta(pkg) + gutil.colors.green(' is already installed, skipping'));
                }
                else {
                    gutil.log(gutil.colors.yellow('Installing package ') + gutil.colors.magenta(pkg));
                    packageCommands.push('bower install ' + pkg + ' --allow-root --force-latest');
                }

            });

        var foldersNotFound = [];

        angus.appConfig.bower.localFolders
            .forEach(function (folder) {
                var version = null;

                // First, try to copy a folder locally if it can be found
                if (fs.existsSync(angus.appPath + '/' + folder)) {
                    if (fs.existsSync(angus.appPath + '/bower_components/' + path.basename(folder))) {
                        gutil.log(gutil.colors.magenta(folder) + gutil.colors.green(' is already installed, skipping'));
                    }
                    else {
                        gutil.log(gutil.colors.yellow('Installing local folder ') + gutil.colors.magenta(folder));

                        mkdirp.sync(angus.appPath + '/bower_components/');
                        fs.symlinkSync(angus.appPath + '/' + folder, angus.appPath + '/bower_components/' + path.basename(folder), 'dir');
                    }
                }
                else {
                    foldersNotFound.push(folder);
                }
            })

        if (foldersNotFound.length) {
            gutil.log(gutil.colors.bgRed('angus.config.js [bower.localFolders] folders missing! '));
            foldersNotFound.forEach(function (file) {
                gutil.log(gutil.colors.red(file));
            });
            playSound('break');
            setTimeout(process.exit, 100);
        }

        var cmds = packageCommands.join(' && ');
        var result = shell.exec(cmds);

        if (result.code !== 0) {
            gutil.log(gutil.colors.red(result.output));
            playSound('break');
            setTimeout(process.exit, 100);
        }
        else {
            gutil.log(gutil.colors.green('Bower packages installed.'));
            cb();
        }
    };
};


