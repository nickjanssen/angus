'use strict';

var buildConfig = require('../nconf.js');
var _ = require('underscore');

var constants = {};

_.extend(constants, require('../apps/' + buildConfig.get('app') + '/config.js').constants);

module.exports = {
    ngconstant: {
        options: {
            name: 'constants',
            dest: 'apps/<%= cfg.app %>/_constants.js',
            constants: constants
        }
    }
};
