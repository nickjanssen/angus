'use strict';

module.exports = function (grunt) {


    var walkDir = require('walkdir');
    var path = require('path');
    var _ = require('underscore');


    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('sass-import-compiler');

    var appPath = grunt.option('path');

    if (!appPath) {
        grunt.fail.fatal('No app path given!');
    }

    var isWin = /^win/.test(process.platform);
    if (isWin) {
        appPath = appPath.replace(/\\/g, "\\\\");
    }

    var appConfig = require(appPath + '/angus.config.js');

    var angus = {
        'package': grunt.file.readJSON('package.json'),
        'appPath': appPath,
        'appName': path.basename(appPath),
        'appConfig': appConfig
    };

    // Load core tasks related to Angus itself
    walkDir.sync('core/tasks/', function (filePath) {
        require(filePath)(grunt, angus);
    });

    // Load app-specific build tasks
    var tasks = {};

    walkDir.sync('grunt/', function (filePath) {
        var name = path.basename(filePath, '.js');
        tasks[name] = require(filePath)(angus);
    });

    angus = _.extend(angus, tasks);

    grunt.initConfig(angus);

    grunt.registerTask('check', [
        'checkConfig',
        'bowerInstall',
        'copy:cssAsScssWorkaround',
        'checkLibIncludes'
    ]);

    // This function removes or adds build tasks depending on the app config
    var appTaskFilter = require('./core/appTaskFilter.js')(angus);

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
