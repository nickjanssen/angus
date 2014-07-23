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
            '!./src/<%= cfg.app %>/config.js',
            './dist/tmp/templates.js',
            './dist/tmp/templates_lib.js'
        ].concat(additionalLibs),
        dest: './dist/prod/assets/js/app/app.min.js'
    }
};
