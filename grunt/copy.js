'use strict';

var buildConfig = require('../nconf.js');

module.exports = {
    dev: {
        files: [
            {
                expand: true,
                // flatten: true,
                cwd: 'src/<%= cfg.app %>/',
                src: [
                    '*.html',
                ],
                dest: './dist/dev/'
            },
            {
                expand: true,
                // flatten: true,
                cwd: 'src/<%= cfg.app %>/',
                src: [
                    '**/*.js',
                    '!**/config.js',
                ],
                dest: './dist/dev/assets/js/app/'
            },
            {
                expand: true,
                // flatten: true,
                cwd: 'bower_components/',
                src: require('../src/' + buildConfig.get('app') + '/config.js').libIncludes.js,
                dest: './dist/dev/assets/js/lib/'
            },
            {
                expand: true,
                cwd: 'src/<%= cfg.app %>/assets/',
                src: [
                    '**/*',
                ],
                dest: './dist/dev/assets/'
            }
        ],
    },
    prod: {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    'src/<%= cfg.app %>/*.html'
                ],
                dest: './dist/prod/'
            },
            {
                expand: true,
                cwd: 'src/<%= cfg.app %>/assets/',
                src: [
                    '**/*',
                    '!**/config.js',
                ],
                dest: './dist/prod/assets/'
            }
        ]
    }
};
