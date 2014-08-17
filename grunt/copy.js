'use strict';



module.exports = function (angus) {
    return {

        // Workaround to include CSS files using sass @import rules
        // This task copies all CSS files and renames them to SCSS
        // See https://github.com/sass/sass/issues/556
        cssAsScssWorkaround: {
            files: [{
                expand: true,
                cwd: angus.appPath + '/bower_components',
                src: ['**/*.css', '!**/*.min.css'],
                dest: angus.appPath + '/bower_components',
                filter: 'isFile',
                ext: '.scss'
            }]
        },

        dev: {
            files: [{
                expand: true,
                // flatten: true,
                cwd: angus.appPath + '/src',
                src: [
                    '*.html',
                ],
                dest: angus.appPath + '/dist/dev/'
            }, {
                expand: true,
                // flatten: true,
                cwd: angus.appPath + '/src',
                src: [
                    '**/*.js'
                ],
                dest: angus.appPath + '/dist/dev/assets/js/app/'
            }, {
                expand: true,
                // flatten: true,
                cwd: angus.appPath + '/bower_components/',
                src: angus.appConfig.bower.filesNeeded.js,
                dest: angus.appPath + '/dist/dev/assets/js/lib/'
            }, {
                expand: true,
                cwd: angus.appPath + '/src/assets/',
                src: [
                    '**/*',
                ],
                dest: angus.appPath + '/dist/dev/assets/'
            }]
        },
        prod: {
            files: [{
                expand: true,
                flatten: true,
                src: [
                    angus.appPath + '/src/*.html'
                ],
                dest: angus.appPath + '/dist/prod/'
            }, {
                expand: true,
                cwd: angus.appPath + '/src/assets/',
                src: [
                    '**/*'
                ],
                dest: angus.appPath + '/dist/prod/assets/'
            }]
        }
    };
};
