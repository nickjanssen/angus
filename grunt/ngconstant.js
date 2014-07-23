'use strict';

var buildConfig = require('../nconf.js');
var _ = require('underscore');
var fs = require('fs');

var constants = {};

_.extend(constants, require('../src/' + buildConfig.get('app') + '/config.js').constants);

if (fs.existsSync('src/' + buildConfig.get('app') + '/assets/firebaked.json')) {
    _.extend(constants, {
        'firebaked': require('../src/' + buildConfig.get('app') + '/assets/firebaked.json')
    });
}

module.exports = {
    ngconstant: {
        options: {
            name: 'constants',
            dest: 'src/<%= cfg.app %>/_constants.js',
            constants: constants
        }
    }
};
