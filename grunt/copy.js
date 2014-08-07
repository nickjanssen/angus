'use strict';

var buildConfig = require('../nconf.js');

module.exports = {

    // By default, your apps will use .jshintrc and .editorconfig files
    // that come from the core/ folder. You can use your own rule files
    // by including them inside your app folder.
    lintSettings: {
        files: [
            {
                expand: true,
                cwd: 'core/',
                src: [
                    '.jshintrc',
                    '.editorconfig',
                ],
                dest: './'
            },
            {
                expand: true,
                cwd: 'apps/<%= cfg.app %>/',
                src: [
                    '.jshintrc',
                    '.editorconfig',
                ],
                dest: './'
            }
        ]
    },

    // Workaround to include CSS files using sass @import rules
    // This task copies all CSS files and renames them to SCSS
    cssAsScssWorkaround: {
        files: [
            {
                expand: true,
                cwd: 'bower_components',
                src: ['**/*.css', '!**/*.min.css'],
                dest: 'bower_components',
                filter: 'isFile',
                ext: '.scss'
            }
        ]
    },
    dev: {
        files: [
            {
                expand: true,
                // flatten: true,
                cwd: 'apps/<%= cfg.app %>/',
                src: [
                    '*.html',
                ],
                dest: './dist/dev/'
            },
            {
                expand: true,
                // flatten: true,
                cwd: 'apps/<%= cfg.app %>/',
                src: [
                    '**/*.js',
                    '!tests/**/*',
                    '!**/config.js',
                ],
                dest: './dist/dev/assets/js/app/'
            },
            {
                expand: true,
                // flatten: true,
                cwd: 'bower_components/',
                src: require('../apps/' + buildConfig.get('app') + '/config.js').libIncludes.js,
                dest: './dist/dev/assets/js/lib/'
            },
            {
                expand: true,
                cwd: 'apps/<%= cfg.app %>/assets/',
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
                    'apps/<%= cfg.app %>/*.html'
                ],
                dest: './dist/prod/'
            },
            {
                expand: true,
                cwd: 'apps/<%= cfg.app %>/assets/',
                src: [
                    '**/*',
                    '!**/config.js',
                ],
                dest: './dist/prod/assets/'
            }
        ]
    }
};
