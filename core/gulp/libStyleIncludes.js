'use strict';

module.exports = function (angus) {

    var includes = angus.appConfig.bower.filesNeeded[angus.appConfig.__cssCompilerExtension]
    .map(function (file) {
        return '@import ' + (angus.appConfig.__cssCompilerExtension === 'less' ? '(less) ' : '') + '\'../../bower_components/' + file + '\';';
    }).join('\n');

    return function (cb) {
        require('fs')
        .writeFile(angus.appPath + '/src/style/_includes.' +
            angus.appConfig.__cssCompilerExtension, includes, cb);
    };
};
