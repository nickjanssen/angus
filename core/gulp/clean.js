'use strict';

var del     = require('del');

module.exports = function (angus) {
    return function (cb) {
        del([angus.appPath + '/dist'], {force: true}, cb);
    };
};
