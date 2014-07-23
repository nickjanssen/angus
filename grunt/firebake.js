'use strict';

var buildConfig = require('../nconf.js');
var appConfig = require('../src/' + buildConfig.get('app') + '/config.js');

module.exports = {
    options: {
        baseUrl: appConfig.constants.firebaseConfig ?
            appConfig.constants.firebaseConfig.url : '',
        targets: appConfig.firebakeTargets,
        dest: 'src/' + buildConfig.get('app') + '/assets/firebaked.json'
    }
};
