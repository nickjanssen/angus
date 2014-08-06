'use strict';

var buildConfig = require('../nconf.js');

// Workaround to include CSS files using sass @import rules
// This task copies all CSS files and renames them to SCSS
var cssAsScssWorkaround = {
    expand: true,
    cwd: 'bower_components',
    src: ['**/*.css', '!**/*.min.css'],
    dest: 'bower_components',
    filter: 'isFile',
    ext: '.scss'
};

module.exports = {
    cssAsScssWorkaround: {
        files: [
            cssAsScssWorkaround
        ]
    },
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
        ]
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
