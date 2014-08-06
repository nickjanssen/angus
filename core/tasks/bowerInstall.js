'use strict';

var buildConfig = require('../../nconf.js');
var appConfig = require('../../src/' + buildConfig.get('app') + '/config.js');
var sh = require('execSync');

module.exports = function (grunt) {

    grunt.task.registerTask('bowerInstall', '', function () {

        grunt.log.writeln('Installing Bower packages...'.yellow);

        var packageCommands = appConfig.packages
            .map(function (pkg) {
                return 'bower install ' + pkg;
            });
        packageCommands.unshift('rm -rf bower_components');

        var result = sh.exec(packageCommands.join(' && '));

        if (result.code !== 0) {
            grunt.fail.fatal(result.stdout);
        }

        grunt.log.writeln('Packages installed.'.green);

    });

};
