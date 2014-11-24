'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var walkDir = require('walkdir');
var fs = require('fs');
var path = require('path');
var runSequence = require('run-sequence');

module.exports = function (argTasks, appPath) {

    var appConfig = require(appPath + '/angus.config.js');
    require('./setAppConfigDefaults.js')(appConfig);
    require('./buildFilePaths.js')(appConfig, appPath);

    var angus = {
        'args': argTasks,
        'package': require('../package.json'),
        'appPath': appPath,
        'appName': path.basename(appPath),
        'appConfig': appConfig
    };

    // Load core tasks related to Angus itself
    walkDir.sync('./core/gulp/', function (filePath) {
        var name = path.basename(filePath, '.js');
        gulp.task(name, function (cb) {
            gutil.log(gutil.colors.cyan('Running task: ') + gutil.colors.magenta(name));
            return require(filePath)(angus, gulp)(cb);
        });
    });

    // Load app tasks which can be run using `angus <task>` from that app directory
    if (fs.existsSync(appPath + '/tasks/')) {
        walkDir.sync(appPath + '/tasks/', function (filePath) {
            var name = path.basename(filePath, '.js');
            gulp.task(name, function (cb) {
                gutil.log(gutil.colors.cyan('Running app task: ') + gutil.colors.blue(name));
                return require(filePath)(angus, gulp)(cb);
            });
        });
    }

    var fullBuildTags = [
        'check',
        'js',
        'clean',
        'html',
        'assets',
        'css'
    ];

    var tasks = [
        {
            name: 'dev',
            env: 'dev',
            tags: fullBuildTags.concat(['serve'])
        },
        {
            name: 'prod',
            env: 'prod',
            tags: fullBuildTags.concat(['serve'])
        },
        {
            name: 's3',
            env: 'prod',
            tags: fullBuildTags.concat(['s3'])
        },
        {
            name: 'buildDev',
            env: 'dev',
            tags: fullBuildTags
        },
        {
            name: 'buildProd',
            env: 'prod',
            tags: fullBuildTags
        },
    ];

    tasks.forEach(function (task) {
        gulp.task(task.name, function (callback) {
            angus.env = task.env;
            var taskList = require('./buildGulpTaskList.js')(angus, task.tags);
            taskList.push(callback);
            runSequence.apply(null, taskList);
        });
    });

    gulp.start(argTasks._);
};
