'use strict';

var _ = require('underscore');

module.exports = function (angus) {
    return function (entry) {
        var found = false;
        var gruntTasks = angus.appConfig.gruntTasks || require('./defaultTasks.js');
        if (angus.appConfig.gruntTasksIgnore) {
            gruntTasks = _.without(gruntTasks, angus.appConfig.gruntTasksIgnore);
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
