'use strict';

var _ = require('underscore');
var fs = require('fs');
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

    var appConfig = require('./src/' + buildConfig.get('app') + '/config.js');

    grunt.log.writeln('Checking config.js of ' +
            buildConfig.get('app'));

    // Do config checks
    var validate = require('jsonschema').validate;
    var result = validate(appConfig, require('./app.config.json'));

    result.errors.forEach(function (error) {
        grunt.fail.warn(error.stack.replace('instance.', 'src/' +
            buildConfig.get('app') + '/config.js: '));
    });

    grunt.log.writeln('Looks good.');

    // Check that all libIncludes given for this app exist
    _.union(appConfig.libIncludes.js,
        _.pluck(appConfig.libIncludes.tpl, 'libPath'),
        appConfig.libIncludes.scss).forEach(function (file) {
        if (!fs.existsSync('lib/' + file)) {
            grunt.fail.warn('src/' +
                buildConfig.get('app') + '/config.js: libIncludes: lib/' + file + ' does not exist!');
        }
    });


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

    var appTaskFilter = function (entry) {
        var found = false;
        appConfig.gruntTasks.forEach(function (task) {
            if (entry.indexOf(task) !== -1) {
                found = true;
            }
        });
        return found;
    };

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
    ].filter(appTaskFilter));

    grunt.registerTask('build_prod', [
        'jshint',
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
