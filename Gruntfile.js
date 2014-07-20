'use strict';

var walkDir = require('walkdir');
var path = require('path');
var buildConfig = require('./nconf.js');

module.exports = function (grunt) {

    // Overwrite build target if present on the command line
    if (grunt.option('app')) {
        buildConfig.set('app', grunt.option('app'));
    }
    else {
        grunt.log.writeln('No --app parameter given, using config.json (' +
            buildConfig.get('app') + ')');
    }

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        cfg: buildConfig.get()
    };

    walkDir.sync('./grunt/', function (filePath) {
        var name = path.basename(filePath, '.js');
        taskConfig[name] = require(filePath);
    });

    grunt.initConfig(taskConfig);

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('sass-import-compiler');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('build_dev', [
        'jshint',
        'ngconstant',
        'clean:dev',
        'copy:dev',
        'replace:dev',
        'html2js:libDev',
        'html2js:dev',
        'sass_import_compiler',
        'sass:dev',
        'includeSource:dev'
    ]);

    grunt.registerTask('build_prod', [
        'jshint',
        'clean:prod',
        'copy:prod',
        'replace:prod',
        'sass_import_compiler',
        'sass:prod',
        'html2js:libProd',
        'html2js:prod',
        'concat:prod',
        'ngmin:prod',
        'uglify:prod',
        'includeSource:prod'
    ]);

    grunt.registerTask('dev', [
        'build_dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'build_prod',
        'connect:prod',
        'watch:dummy'
    ]);
};
