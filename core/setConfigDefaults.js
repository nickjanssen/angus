'use strict';

module.exports = function (appConfig) {

    appConfig.bower = appConfig.bower || {};

    appConfig.bower.filesNeeded = appConfig.bower.filesNeeded || {};

    appConfig.bower.filesNeeded.js = appConfig.bower.filesNeeded.js || [];
    appConfig.bower.filesNeeded.scss = appConfig.bower.filesNeeded.scss || [];
    appConfig.bower.filesNeeded.less = appConfig.bower.filesNeeded.less || [];
    appConfig.bower.filesNeeded.html = appConfig.bower.filesNeeded.html || [];

    appConfig.port = appConfig.port || 9000;
    appConfig.cssCompiler = appConfig.cssCompiler || 'sass';
    appConfig.testRunner = appConfig.testRunner || 'karma';
    appConfig.usesAngularJS = appConfig.usesAngularJS || false;
};
