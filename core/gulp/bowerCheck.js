'use strict';

var shell = require('shelljs');
var fs = require('fs');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = function (angus) {
    return function (cb) {


        var packageCommands = [];

        packageCommands.push('cd ' + angus.appPath);

        gutil.log(gutil.colors.yellow('Installing NPM packages...'));

        angus.appConfig.npm.packages
            .forEach(function (pkg) {
                var version = null;
                var pkgName = pkg;

                // Check if there is a version available
                if (pkg.indexOf('@') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('@');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for tags
                else if (pkg.indexOf('#') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('#');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for readAs packages using '='
                else if (pkg.indexOf('=') !== -1) {
                    var pkgArr = pkg.split('=');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }

                if (fs.existsSync(angus.appPath + '/node_modules/' + pkgName)) {
                    gutil.log(gutil.colors.magenta(pkgName) + gutil.colors.green(' is already installed, skipping'));
                }
                else {
                    gutil.log(gutil.colors.yellow('Installing package ') + gutil.colors.magenta(pkgName));
                    packageCommands.push('npm install ' + pkg + '');
                }
            });

        gutil.log(gutil.colors.yellow('Installing Bower packages...'));

        angus.appConfig.bower.packages
            .forEach(function (pkg) {

                var version = null;
                var pkgName = pkg;

                // Check if there is a version available
                if (pkg.indexOf('@') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('@');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for tags
                else if (pkg.indexOf('#') !== -1 && pkg.indexOf('=') === -1) {
                    var pkgArr = pkg.split('#');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }
                // Support for readAs packages using '='
                else if (pkg.indexOf('=') !== -1) {
                    var pkgArr = pkg.split('=');
                    pkgName = pkgArr[0];
                    version = pkgArr[1];
                }

                if (fs.existsSync(angus.appPath + '/bower_components/' + pkgName)) {
                    gutil.log(gutil.colors.magenta(pkgName) + gutil.colors.green(' is already installed, skipping'));
                }
                else {
                    gutil.log(gutil.colors.yellow('Installing package ') + gutil.colors.magenta(pkgName));
                    packageCommands.push('bower install ' + pkg + ' --allow-root' + (!version ? ' --force-latest' : ''));
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


