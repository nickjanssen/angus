'use strict';

module.exports = function (angus) {

    // Build an array of script tags manually
    // We can't use grunt-include-source because it does not take into account
    // the order of the libIncludes.js array in /apps/your-app/config.js
    var libScripts = angus.appConfig.bower.filesNeeded.js
        .map(function (script) {
            return '<script src="' + (angus.appConfig.staticServerUrl || '') + 'assets/js/lib/' + script + '"></script>';
        }).join('\n');

    return {
        dev: {
            options: {
                variables: {
                    app: angus.appName,
                    minified: '',
                    libScripts: libScripts
                }
            },
            files: [{
                expand: true,
                flatten: true,
                src: [
                    angus.appPath + '/dist/dev/index.html'
                ],
                dest: angus.appPath + '/dist/dev/'
            }]
        },
        prod: {
            options: {
                variables: {
                    app: angus.appName,
                    minified: '.min',
                    libScripts: ''
                }
            },
            files: [{
                expand: true,
                flatten: true,
                src: [
                    angus.appPath + '/dist/prod/index.html'
                ],
                dest: angus.appPath + '/dist/prod/'
            }]
        }
    };
};
