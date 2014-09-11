'use strict';

var glob = require('glob');

var convertBlob = function (arr, appPath) {
    var newFileNames = [];
    arr.forEach(function (file) {
        if (/[\*!]/g.test(file)) {
            newFileNames = newFileNames.concat(glob.sync(file, {
                cwd: appPath
            }));
        }
        else {
            newFileNames.push(file);
        }
    });

    return newFileNames;
}

module.exports = function (appConfig, appPath) {

    appConfig.bower.localFolders = convertBlob(appConfig.bower.localFolders, appPath);
    appConfig.bower.filesNeeded.js = convertBlob(appConfig.bower.filesNeeded.js, appPath);
    appConfig.bower.filesNeeded.html = convertBlob(appConfig.bower.filesNeeded.html, appPath);
    appConfig.bower.filesNeeded.scss = convertBlob(appConfig.bower.filesNeeded.scss, appPath);
    appConfig.bower.filesNeeded.less = convertBlob(appConfig.bower.filesNeeded.less, appPath);
    appConfig.bower.filesNeeded.assets = convertBlob(appConfig.bower.filesNeeded.assets, appPath);

};
