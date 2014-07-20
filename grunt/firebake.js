'use strict';

var buildConfig = require('../nconf.js');
var siteConfig = require('../src/' + buildConfig.get('app') + '/config.js');

module.exports = {
    options: {
        baseUrl: siteConfig.constants.firebaseConfig ?
            siteConfig.constants.firebaseConfig.url : '',
        targets: siteConfig.firebakeTargets,
        dest: 'src/' + buildConfig.get('app') + '/assets/firebaked.json'
    }
};
