'use strict';

var buildConfig = require('../nconf.js');

var additionalLibs = require('../apps/' + buildConfig.get('app') + '/config.js').libIncludes.js
.map(function (lib) {
    return 'bower_components/' + lib;
});

module.exports = {
    options: {
        separator: ';'
    },
    prod: {
        src: [
            './apps/<%= cfg.app %>/**/*.js',
            '!./apps/<%= cfg.app %>/config.js',
            './dist/tmp/templates.js',
            './dist/tmp/templates_lib.js'
        ].concat(additionalLibs),
        dest: './dist/prod/assets/js/app/app.min.js'
    }
};
