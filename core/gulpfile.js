'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var walkDir = require('walkdir');
var path = require('path');
var runSequence = require('run-sequence');

module.exports = function (argTasks, appPath) {

    var appConfig = require(appPath + '/angus.config.js');
    require('./setAppConfigDefaults.js')(appConfig);

    var angus = {
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

    var fullBuildTasks = [
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
            tags: fullBuildTasks.concat(['serve'])
        },
        {
            name: 'prod',
            env: 'prod',
            tags: fullBuildTasks.concat(['serve'])
        },
        {
            name: 's3',
            env: 'prod',
            tags: fullBuildTasks.concat(['s3'])
        }
    ];

    tasks.forEach(function (task) {
        gulp.task(task.name, function (callback) {
            angus.env = task.env;
            var taskList = require('./buildGulpTaskList.js')(angus, task.tags);
            taskList.push(callback);
            runSequence.apply(null, taskList);
        });
    });

    gulp.start(argTasks);
};
