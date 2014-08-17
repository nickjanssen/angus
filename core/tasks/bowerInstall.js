'use strict';

var shell = require('shelljs');

module.exports = function (grunt, angus) {

    grunt.task.registerTask('bowerInstall', '', function () {

        grunt.log.writeln('Installing Bower packages...'.yellow);

        var packageCommands = angus.appConfig.bower.packages
            .map(function (pkg) {
                return 'bower install ' + pkg;
            });
        packageCommands.unshift('rm -rf bower_components');
        packageCommands.unshift('cd ' + angus.appPath);

        var cmds = packageCommands.join(' && ');
        var result = shell.exec(cmds);

        if (result.code !== 0) {
            grunt.fail.fatal(result.output);
        }

        grunt.log.writeln('Packages installed.'.green);

    });

};
