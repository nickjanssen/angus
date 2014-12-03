'use strict';

module.exports = function (angus, context) {

    var cfg = angus.appConfig;

    var taskList = [];

    if (context.indexOf('check') !== -1) {
        taskList.push('checkConfig');
        taskList.push('depCheck');
        taskList.push('bowerCheck');
        taskList.push('checkFilesNeeded');
    }

    (function () {
        var subTaskList = [];

        if (cfg.useJsHint && context.indexOf('js') !== -1) {
            subTaskList.push('jshint');
        }

        if (cfg.testRunner === 'karma' && context.indexOf('js') !== -1) {
            subTaskList.push('karma');
        }

        if (subTaskList.length) {
            taskList.push(subTaskList);
        }
    })();

    if (context.indexOf('clean') !== -1) {
        taskList.push('clean');
    }

    if (context.indexOf('configFileChangedWarning') !== -1) {
        taskList.push('configFileChangedWarning');
    }

    if (context.indexOf('css') !== -1) {
        if (cfg.cssCompiler === 'sass' || cfg.cssCompiler === 'less') {
            taskList.push('libStyleIncludes');
        }
    }

    (function () {
        var subTaskList = [];

        if (context.indexOf('assets') !== -1) {
            subTaskList.push('assets');

            if (cfg.bower.filesNeeded.assets.length) {
                subTaskList.push('assetsLib');
            }
        }

        if (context.indexOf('js') !== -1 && angus.env === 'dev') {

            if (cfg.usesCoffeeScript) {
                subTaskList.push('coffee');
            }

            subTaskList.push('jsApp');

            // Only copy JS libraries if there are any, otherwise gulp fails with an empty stream
            if (cfg.bower.filesNeeded.js.length) {
                subTaskList.push('jsLib');
            }

            if (cfg.usesAngularJS) {
                subTaskList.push('templatesLib');
                subTaskList.push('templatesApp');
            }
        }

        if (context.indexOf('js') !== -1 && angus.env === 'prod') {
            subTaskList.push('jsProd');
        }

        if (cfg.usesAngularJS && context.indexOf('js') !== -1 && cfg.constants) {
            subTaskList.push('constants');
        }

        if (context.indexOf('css') !== -1) {
            if (cfg.cssCompiler === 'sass') {
                subTaskList.push('sass');
            }
            else if (cfg.cssCompiler === 'less') {
                subTaskList.push('less');
            }
            else if (cfg.cssCompiler === 'none') {
                subTaskList.push('css');
            }
        }

        if (subTaskList.length) {
            taskList.push(subTaskList);
        }
    })();

    if (context.indexOf('html') !== -1 ||
        context.indexOf('js') !== -1) {
        taskList.push('html');
    }

    if (context.indexOf('serve') !== -1) {
        taskList.push(['watch', 'connect']);
    }

    if (context.indexOf('s3') !== -1) {
        taskList.push('uploadS3');
    }

    return taskList;
};
