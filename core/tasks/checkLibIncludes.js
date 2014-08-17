'use strict';

var _ = require('underscore');
var fs = require('fs');

module.exports = function (grunt, angus) {

    grunt.task.registerTask('checkLibIncludes', '', function () {

        grunt.log.writeln('Checking if any library includes are missing...'.yellow);

        // Check that all libIncludes given for this app exist
        _.union(angus.appConfig.bower.filesNeeded.js,
            _.pluck(angus.appConfig.bower.filesNeeded.html, 'libPath'),
            angus.appConfig.bower.filesNeeded.scss,
            angus.appConfig.bower.filesNeeded.less)
            .forEach(function (file) {
            if (!fs.existsSync(angus.appPath + '/bower_components/' + file)) {
                grunt.fail.fatal('angus.config.js [bower.filesNeeded] bower_components/' + file + ' does not exist!');
            }
        });

        grunt.log.writeln('All library includes were found.'.green);

    });

};
