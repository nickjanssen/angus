'use strict';

var shell = require('shelljs');
var fs = require('fs');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');

module.exports = function (angus) {
    return function (cb) {

        gutil.log(gutil.colors.yellow('Installing Bower packages...'));

        var packageCommands = angus.appConfig.bower.packages
            .filter(function (pkg) {
                var found = fs.existsSync(angus.appPath + '/bower_components/' + pkg);

                if (found) {
                    gutil.log(gutil.colors.magenta(pkg) + gutil.colors.green(' is already installed, skipping'));
                }
                else {
                    gutil.log(gutil.colors.yellow('Installing ') + gutil.colors.magenta(pkg));
                }

                return !found;
            })
            .map(function (pkg) {
                return 'bower install ' + pkg;
            });

        // packageCommands.unshift('rm -rf bower_components');
        packageCommands.unshift('cd ' + angus.appPath);

        var cmds = packageCommands.join(' && ');
        var result = shell.exec(cmds);

        if (result.code !== 0) {
            console.log(result.output.red);
            playSound('break');
            setTimeout(process.exit, 100);
        }
        else {
            gutil.log(gutil.colors.green('Bower packages installed.'));
            cb();
        }
    };
};
