'use strict';

var _ = require('underscore');

module.exports = function (angus) {
    return function (entry) {
        var found = false;
        var gruntTasks = angus.appConfig.gruntTasks || require('./defaultTasks.js');
        if (angus.appConfig.gruntTasksIgnore) {
            gruntTasks = _.filter(gruntTasks, function (task) {
                return _.some(angus.appConfig.gruntTasksIgnore, function (ignoredTask) {
                    return task.indexOf(ignoredTask) === -1;
                });
            });
        }
        if (angus.appConfig.gruntTasksAdd) {
            gruntTasks = _.union(gruntTasks, angus.appConfig.gruntTasksAdd);
        }
        gruntTasks.forEach(function (task) {
            if (entry.indexOf(task) !== -1) {
                found = true;
            }
        });
        return found;
    };
};
