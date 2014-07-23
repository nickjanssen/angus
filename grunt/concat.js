'use strict';

var buildConfig = require('../nconf.js');

var additionalLibs = require('../src/' + buildConfig.get('app') + '/config.js').libIncludes.js
.map(function (lib) {
    return 'lib/' + lib;
});

module.exports = {
    options: {
        separator: ';'
    },
    prod: {
        src: [
            './src/<%= cfg.app %>/**/*.js',
            './dist/tmp/templates.js',
            './dist/tmp/templates_lib.js'
        ].concat(additionalLibs),
        dest: './dist/prod/assets/app.min.js'
    }
};
