'use strict';

var buildConfig = require('../nconf.js');
var libScss = require('../src/' + buildConfig.get('app') + '/config.js').libIncludes.scss
.map(function (lib) {
    return 'lib/' + lib;
});

module.exports = {
    all: {
        files: {
            'src/<%= cfg.app %>/scss/_includes.scss': libScss,
        }
    }
};
