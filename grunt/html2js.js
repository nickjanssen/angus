'use strict';

var path = require('path');

// Only include templates from libs we are actually using
var buildConfig = require('../nconf.js');
var libTemplates = require('../src/' + buildConfig.get('app') + '/config.js').includes.js
.map(function (lib) {
    return path.dirname('lib/' + lib) + '/**/*.tpl.html';
});

module.exports = {
    options: {
        // custom options, see below
        module: 'templates',
        base: 'src/<%= cfg.app %>/'
    },
    libDev: {
        options: {
            // custom options, see below
            module: 'templates_lib',
            base: 'lib/'
        },
        src: libTemplates,
        dest: 'dist/dev/assets/js/templates/templates_lib.js'
    },
    dev: {
        src: [
            'src/<%= cfg.app %>/**/*.tpl.html'
        ],
        dest: 'dist/dev/assets/js/templates/templates.js'
    },
    libProd: {
        options: {
            // custom options, see below
            module: 'templates_lib',
            base: 'lib/'
        },
        src: libTemplates,
        dest: 'dist/tmp/templates_lib.js'
    },
    prod: {
        src: [
            'src/<%= cfg.app %>/**/*.tpl.html'
        ],
        // We put the templates in a temp directory as we concat it
        // shortly afterwards
        dest: 'dist/tmp/templates.js'
    }
};
