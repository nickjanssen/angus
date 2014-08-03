'use strict';

var _ = require('underscore');

// Only include templates from libs we are actually using
var buildConfig = require('../nconf.js');
var appConfig = require('../src/' + buildConfig.get('app') + '/config.js');
var libTemplates = appConfig.libIncludes.tpl
.map(function (lib) {
    return 'bower_components/' + lib.libPath;
});

var libRename = function (moduleName) {
    return _.find(appConfig.libIncludes.tpl, function (template) {
        return template.libPath === moduleName;
    }).readAs;
};

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
            rename: libRename,
            base: 'bower_components/'
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
            rename: libRename,
            base: 'bower_components/'
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
