'use strict';

var _ = require('underscore');

module.exports = function (angus, env) {

    var cfg = angus.appConfig;

    var taskList = [];

    if (cfg.useJsHint) {
        taskList.push('jshint');
    }

    if (cfg.testRunner === 'karma') {
        taskList.push('karma');
    }

    taskList.push('clean:' + env);
    taskList.push('copy:' + env);
    taskList.push('replace:' + env);

    if (cfg.usesAngularJS) {
        if (env === 'dev') {
            taskList.push('html2js:libDev');
            taskList.push('html2js:dev');
        }
        else if (env === 'prod') {
            taskList.push('html2js:libProd');
            taskList.push('html2js:prod');
        }
    }

    if (cfg.cssCompiler === 'sass') {
        taskList.push('sass_import_compiler');
        taskList.push('sass:' + env);
    }
    else if (cfg.cssCompiler === 'less') {
        taskList.push('less_import_compiler');
        taskList.push('less:' + env);
    }

    if (env === 'prod') {
        taskList.push('concat:prod');

        if (cfg.usesAngularJS) {
            taskList.push('ngmin:prod');
        }

        taskList.push('uglify:prod');
    }

    taskList.push('includeSource:' + env);

    return taskList;
};
