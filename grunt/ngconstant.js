'use strict';

var _ = require('underscore');

module.exports = function (angus) {

    var constants = {};

    _.extend(constants, angus.appConfig.constants);

    return {
        ngconstant: {
            options: {
                name: 'constants',
                dest: angus.appPath + '/src/_constants.js',
                constants: constants
            }
        }
    };
};
