'use strict';

var buildConfig = require('../nconf.js');
var appConfig = require('../src/' + buildConfig.get('app') + '/config.js');

// Build an array of script tags manually
// We can't use grunt-include-source because it does not take into account
// the order of the libIncludes.js array in /src/your-app/config.js
var libScripts = appConfig.libIncludes.js
.map(function (script) {
    return '<script src="' + (appConfig.staticServerUrl || '') + 'assets/js/lib/' + script + '"></script>';
}).join('\n');


module.exports = {
    dev: {
        options: {
            variables: {
                app: '<%= cfg.app %>',
                minified: '',
                libScripts: libScripts
            }
        },
        files: [{
            expand: true,
            flatten: true,
            src: [
                './dist/dev/index.html'
            ],
            dest: './dist/dev/'
        }]
    },
    prod: {
        options: {
            variables: {
                app: '<%= cfg.app %>',
                minified: '.min',
                libScripts: libScripts
            }
        },
        files: [{
            expand: true,
            flatten: true,
            src: [
                './dist/prod/index.html'
            ],
            dest: './dist/prod/'
        }]
    }
};
