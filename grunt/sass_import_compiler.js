'use strict';

module.exports = function (angus) {

    var libScss = angus.appConfig.libIncludes.scss
        .map(function (lib) {
            return angus.appPath + '/bower_components/' + lib;
        });

    var files = {};
    files[angus.appPath + '/src/scss/_includes.scss'] = libScss;

    return {
        all: {
            files: files
        }
    };
};
