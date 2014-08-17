'use strict';

module.exports = function (angus) {
    var libLess = angus.appConfig.bower.filesNeeded.less
        .map(function (lib) {
            return angus.appPath + '/bower_components/' + lib;
        });

    var filesLess = {};
    filesLess[angus.appPath + '/src/less/_includes.less'] = libLess;

    return {
        less: {
            files: filesLess
        }
    };
};
