'use strict';

var buildConfig = require('../nconf.js');
var libScss = require('../apps/' + buildConfig.get('app') + '/config.js').libIncludes.scss
.map(function (lib) {
    return 'bower_components/' + lib;
});

module.exports = {
    all: {
        files: {
            'apps/<%= cfg.app %>/scss/_includes.scss': libScss,
        }
    }
};
