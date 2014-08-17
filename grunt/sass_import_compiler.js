'use strict';

module.exports = function (angus) {

    var libScss = angus.appConfig.bower.filesNeeded.scss
        .map(function (lib) {
            return angus.appPath + '/bower_components/' + lib;
        });

    var filesScss = {};
    filesScss[angus.appPath + '/src/scss/_includes.scss'] = libScss;

    return {
        scss: {
            files: filesScss
        }
    };
};
