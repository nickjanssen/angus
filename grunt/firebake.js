'use strict';

var buildConfig = require('../nconf.js');
var appConfig = require('../apps/' + buildConfig.get('app') + '/config.js');

module.exports = {
    options: {
        baseUrl: appConfig.constants.firebaseConfig ?
            appConfig.constants.firebaseConfig.url : '',
        targets: appConfig.firebakeTargets,
        dest: 'apps/' + buildConfig.get('app') + '/assets/firebaked.json'
    }
};
