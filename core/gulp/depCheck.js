'use strict';

var shell = require('shelljs');
var playSound = require('../playSound.js');
var gutil = require('gulp-util');

module.exports = function (angus) {
    return function (cb) {

        var error = false;

        gutil.log(gutil.colors.yellow('Checking if required dependencies are installed...'));

        if (!shell.which('git')) {
            gutil.log(gutil.colors.red('Git could not be found, please install it.'));
            playSound('break');
            setTimeout(process.exit, 100);
        }

        if (!shell.which('bower')) {
            gutil.log(gutil.colors.red('Bower could not be found, please install it.'));
            gutil.log(gutil.colors.cyan('Bower can be installed by running the command'));
            gutil.log(gutil.colors.white('    npm install -g bower'));
            playSound('break');
            setTimeout(process.exit, 100);
            error = true;
        }

        if (angus.appConfig.cssCompiler === 'sass') {
            if (!shell.which('sass')) {
                gutil.log(gutil.colors.cyan('Your app is using a Sass compiler, which requires that you install Sass.'));
                gutil.log(gutil.colors.red('Sass could not be found, please install it.'));
                playSound('break');
                setTimeout(process.exit, 100);
                error = true;
            }
        }

        if (!error) {
            gutil.log(gutil.colors.green('All dependencies installed.'));
            cb();
        }
    };
};
