'use strict';

module.exports = function (angus) {

    var additionalLibs = angus.appConfig.libIncludes.js
    .map(function (lib) {
        return angus.appPath + '/bower_components/' + lib;
    });

    return {
        options: {
            separator: ';'
        },
        prod: {
            src: additionalLibs.concat([
                angus.appPath + '/src/**/*.js',
                angus.appPath + '/dist/tmp/templates.js',
                angus.appPath + '/dist/tmp/templates_lib.js'
            ]),
            dest: angus.appPath + '/dist/prod/assets/js/app/app.min.js'
        }
    };
};
