'use strict';

var walkDir = require('walkdir');
var path = require('path');
var buildConfig = require('./nconf.js');
var appConfig = require('./apps/' + buildConfig.get('app') + '/config.js');
var appTaskFilter = require('./core/appTaskFilter.js');

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('sass-import-compiler');

    // Load core tasks related to Angus itself
    walkDir.sync('core/tasks/', function (filePath) {
        require(filePath)(grunt);
    });

    // Overwrite build target if present on the command line
    if (grunt.option('app')) {
        buildConfig.set('app', grunt.option('app'));
    } else {
        grunt.log.writeln(('No --app parameter given, using config.json (' +
            buildConfig.get('app').bold + ')').cyan);
    }

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        cfg: buildConfig.get(),
        appcfg: appConfig
    };

    walkDir.sync('grunt/', function (filePath) {
        var name = path.basename(filePath, '.js');
        taskConfig[name] = require(filePath);
    });

    grunt.initConfig(taskConfig);

    grunt.registerTask('check', [
        'checkConfig',
        'bowerInstall',
        'copy:lintSettings',
        'copy:cssAsScssWorkaround',
        'checkLibIncludes'
    ]);

    grunt.registerTask('build_dev', [
        'jshint',
        'karma',
        'ngconstant',
        'clean:dev',
        'copy:dev',
        'replace:dev',
        'html2js:libDev',
        'html2js:dev',
        'sass_import_compiler',
        'sass:dev',
        'includeSource:dev'
    ].filter(appTaskFilter));

    grunt.registerTask('build_prod', [
        'jshint',
        'karma',
        'ngconstant',
        'clean:prod',
        'copy:prod',
        'replace:prod',
        'html2js:libProd',
        'html2js:prod',
        'sass_import_compiler',
        'sass:prod',
        'concat:prod',
        'ngmin:prod',
        'uglify:prod',
        'includeSource:prod'
    ].filter(appTaskFilter));

    grunt.registerTask('dev', [
        'check',
        'build_dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'check',
        'build_prod',
        'connect:prod',
        'watch'
    ]);

    grunt.registerTask('deploy_s3', [
        'build_prod',
        's3'
    ]);
};
