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

    if (context.indexOf('css') !== -1) {
        if (cfg.cssCompiler === 'sass' || cfg.cssCompiler === 'less') {
            taskList.push('libStyleIncludes');
        }
    }

    (function () {
        var subTaskList = [];

        if (context.indexOf('assets') !== -1) {
            subTaskList.push('assets');
        }

        if (context.indexOf('js') !== -1 && angus.env === 'dev') {
            subTaskList.push('jsApp');
            subTaskList.push('jsLib');

            if (cfg.usesAngularJS) {
                subTaskList.push('templatesLib');
                subTaskList.push('templatesApp');
            }
        }

        if (context.indexOf('js') !== -1 && angus.env === 'prod') {
            subTaskList.push('jsProd');
        }

        if (context.indexOf('css') !== -1) {
            if (cfg.cssCompiler === 'sass') {
                subTaskList.push('sass');
            }
            else if (cfg.cssCompiler === 'less') {
                subTaskList.push('less');
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
