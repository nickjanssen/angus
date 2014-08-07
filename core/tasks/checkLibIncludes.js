'use strict';

var _ = require('underscore');
var fs = require('fs');
var buildConfig = require('../../nconf.js');
var appConfig = require('../../apps/' + buildConfig.get('app') + '/config.js');

module.exports = function (grunt) {

    grunt.task.registerTask('checkLibIncludes', '', function () {

        grunt.log.writeln('Checking if any library includes are missing...'.yellow);

        // Check that all libIncludes given for this app exist
        _.union(appConfig.libIncludes.js,
            _.pluck(appConfig.libIncludes.tpl, 'libPath'),
            appConfig.libIncludes.scss).forEach(function (file) {
            if (!fs.existsSync('bower_components/' + file)) {
                grunt.fail.fatal('apps/' +
                    buildConfig.get('app') + '/config.js: libIncludes: bower_components/' + file + ' does not exist!');
            }
        });

        grunt.log.writeln('All library includes were found.'.green);

    });

};
