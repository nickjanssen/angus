'use strict';

var playSound = require('../playSound.js');
var runSequence = require('run-sequence');

module.exports = function (angus, gulp) {

    var makeTaskList = require('../buildGulpTaskList.js');

    var watchTasks = [
        {
            blob: angus.appPath + '/src/assets/**/*',
            tags: ['assets', 'html']
        },
        {
            blob: angus.appPath + '/src/*.html',
            tags: ['html']
        },
        {
            blob: [
                angus.appPath + '/src/core/**/*.js',
                angus.appPath + '/src/core/**/*.tpl.html'
            ],
            tags: ['js', 'autoInclude']
        },
        {
            blob: [
                angus.appPath + '/src/core/**/*.' + angus.appConfig.__cssCompilerExtension,
                angus.appPath + '/src/style/*.' + angus.appConfig.__cssCompilerExtension,
                '!' + angus.appPath + '/src/style/_includes.' + angus.appConfig.__cssCompilerExtension
            ],
            tags: ['css']
        },
        {
            blob: angus.appPath + '/angus.config.js',
            tags: ['configFileChangedWarning']
        }
    ];

    return function () {

        watchTasks.forEach(function (task) {
            var taskName = 'watch_' + task.tags.join('_');
            gulp.task(taskName, function (callback) {
                var taskList = makeTaskList(angus, task.tags);
                taskList.push(callback);
                runSequence.apply(null, taskList);
            });
            gulp.watch(task.blob, [taskName]);
        });

        playSound('start');

    };
};
