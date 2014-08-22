'use strict';

var playSound = require('../playSound.js');
var gutil = require('gulp-util');

module.exports = function (angus) {
    return function (cb) {

        gutil.log(gutil.colors.yellow('Checking angus.config.js of ') + gutil.colors.blue(angus.appName));

        // Do config checks
        var validate = require('jsonschema').validate;
        var result = validate(angus.appConfig, require('../app.config.json'));

        result.errors.forEach(function (error) {
            gutil.log(gutil.colors.red(error.stack.replace('instance.', 'angus.config.js: ')));
        });

        if (result.errors.length) {
            playSound('break');
            setTimeout(function () {
                process.exit(1);
            }, 100);
        }
        else {
            gutil.colors.green('Looks good.');
            cb();
        }
    };
};
