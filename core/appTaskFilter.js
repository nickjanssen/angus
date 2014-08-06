'use strict';

var buildConfig = require('../nconf.js');
var appConfig = require('../src/' + buildConfig.get('app') + '/config.js');
var _ = require('underscore');

module.exports = function (entry) {
    var found = false;
    var gruntTasks = appConfig.gruntTasks || require('./defaultTasks.js');
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
