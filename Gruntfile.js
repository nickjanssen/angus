'use strict';

var _ = require('underscore');
var fs = require('fs');
var walkDir = require('walkdir');
var path = require('path');
var buildConfig = require('./nconf.js');
var sh = require('execSync');

module.exports = function (grunt) {

    var doChecks = _.some(grunt.cli.tasks, function (task) {
        return task === 'dev' || task === 'prod';
    });

    // Overwrite build target if present on the command line
    if (grunt.option('app')) {
        buildConfig.set('app', grunt.option('app'));
    } else {
        grunt.log.writeln(('No --app parameter given, using config.json (' +
            buildConfig.get('app').bold + ')').cyan);
    }

    var appConfig = require('./src/' + buildConfig.get('app') + '/config.js');

    if (doChecks) {
        grunt.log.writeln(('Checking config.js of ' +
            buildConfig.get('app')).yellow);

        // Do config checks
        var validate = require('jsonschema').validate;
        var result = validate(appConfig, require('./app.config.json'));

        result.errors.forEach(function (error) {
            grunt.fail.fatal(error.stack.replace('instance.', 'src/' +
                buildConfig.get('app') + '/config.js: '));
        });

        grunt.log.writeln('Looks good.'.green);
        grunt.log.writeln('Installing Bower packages...'.yellow);

        var packageCommands = appConfig.packages
            .map(function (pkg) {
                return 'bower install ' + pkg;
            });
        packageCommands.unshift('rm -rf bower_components');

        result = sh.exec(packageCommands.join(' && '));

        if (result.code !== 0) {
            grunt.fail.fatal(result.stdout);
        }

        grunt.log.writeln('Packages installed.'.green);
        grunt.log.writeln('Checking if any library includes are missing...'.yellow);

        // Check that all libIncludes given for this app exist
        _.union(appConfig.libIncludes.js,
            _.pluck(appConfig.libIncludes.tpl, 'libPath'),
            appConfig.libIncludes.scss).forEach(function (file) {
            if (!fs.existsSync('bower_components/' + file)) {
                grunt.fail.fatal('src/' +
                    buildConfig.get('app') + '/config.js: libIncludes: bower_components/' + file + ' does not exist!');
            }
        });

        grunt.log.writeln('All library includes were found.'.green);
    }


    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),
        cfg: buildConfig.get(),
        appcfg: appConfig
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
        var gruntTasks = appConfig.gruntTasks || require('./angus/defaultTasks');
        if (appConfig.gruntTasksIgnore) {
            gruntTasks = _.without(gruntTasks, appConfig.gruntTasksIgnore);
        }
        if (appConfig.gruntTasksAdd) {
            gruntTasks = _.union(gruntTasks, appConfig.gruntTasksAdd);
        }
        gruntTasks.forEach(function (task) {
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
        'watch'
    ]);

    grunt.registerTask('deploy_s3', [
        'build_prod',
        's3'
    ]);
};
