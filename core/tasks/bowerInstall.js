'use strict';

var sh = require('execSync');

module.exports = function (grunt, angus) {

    grunt.task.registerTask('bowerInstall', '', function () {

        grunt.log.writeln('Installing Bower packages...'.yellow);

        var packageCommands = angus.appConfig.packages
            .map(function (pkg) {
                return 'bower install ' + pkg;
            });
        packageCommands.unshift('rm -rf bower_components');
        packageCommands.unshift('cd ' + angus.appPath);

        var result = sh.exec(packageCommands.join(' && '));

        if (result.code !== 0) {
            grunt.fail.fatal(result.stdout);
        }

        grunt.log.writeln('Packages installed.'.green);

    });

};
