'use strict';

module.exports = function (angus) {
    return {
        options: {
            interval: 1000
        },
        js: {
            files: [
                angus.appPath + '/src/**/*',

                // Don't watch the scss/less, as we will watch the compiled CSS for a soft refresh
                '!' + angus.appPath + '/src/scss/**/*',
                '!' + angus.appPath + '/src/less/**/*',

                '!' + angus.appPath + '/**/_*'
            ],
            tasks: ['build_dev']
        },
        html: {
            files: [
                angus.appPath + '/src/index.html'
            ],
            tasks: ['build_dev']
        },
        sass: {
            files: [
                angus.appPath + '/src/scss/**/*',
                '!' + angus.appPath + '/**/_*'
            ],
            tasks: ['sass:dev']
        },
        less: {
            files: [
                angus.appPath + '/src/less/**/*',
                '!' + angus.appPath + '/**/_*'
            ],
            tasks: ['less:dev']
        },
        livereload: {
            options: {
                livereload: 35730
            },
            files: [
                angus.appPath + '/dist/dev/**/*'
            ]
        },
        core: {
            files: [
                angus.appPath + '/angus.config.js'
            ],
            tasks: ['check', 'build_dev']
        }
    };
};
