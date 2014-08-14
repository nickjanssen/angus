'use strict';

var _ = require('underscore');

module.exports = function (angus) {

    // Only include templates from libs we are actually using
    var libTemplates = angus.appConfig.libIncludes.tpl
        .map(function (lib) {
            return angus.path + '/bower_components/' + lib.libPath;
        });

    var libRename = function (moduleName) {
        return _.find(angus.appConfig.libIncludes.tpl, function (template) {
            return template.libPath === moduleName;
        }).readAs;
    };

    return {
        options: {
            // custom options, see below
            module: 'templates',
            base: angus.appPath + '/src'
        },
        libDev: {
            options: {
                // custom options, see below
                module: 'templates_lib',
                rename: libRename,
                base: angus.appPath + '/bower_components/'
            },
            src: libTemplates,
            dest: angus.appPath + '/dist/dev/assets/js/templates/templates_lib.js'
        },
        dev: {
            src: [
                angus.appPath + '/src/**/*.tpl.html'
            ],
            dest: angus.appPath + '/dist/dev/assets/js/templates/templates.js'
        },
        libProd: {
            options: {
                // custom options, see below
                module: 'templates_lib',
                rename: libRename,
                base: angus.appPath + '/bower_components/'
            },
            src: libTemplates,
            dest: angus.appPath + '/dist/tmp/templates_lib.js'
        },
        prod: {
            src: [
                angus.appPath + '/src/**/*.tpl.html'
            ],
            // We put the templates in a temp directory as we concat it
            // shortly afterwards
            dest: angus.appPath + '/dist/tmp/templates.js'
        }
    };
};
