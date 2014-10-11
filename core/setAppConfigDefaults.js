'use strict';

module.exports = function (appConfig) {

    appConfig.npm = appConfig.npm || {};
    appConfig.npm.packages = appConfig.npm.packages || [];

    appConfig.bower = appConfig.bower || {};

    appConfig.bower.packages = appConfig.bower.packages || [];
    appConfig.bower.localFolders = appConfig.bower.localFolders || [];

    appConfig.bower.filesNeeded = appConfig.bower.filesNeeded || {};

    appConfig.bower.filesNeeded.js = appConfig.bower.filesNeeded.js || [];
    appConfig.bower.filesNeeded.scss = appConfig.bower.filesNeeded.scss || [];
    appConfig.bower.filesNeeded.less = appConfig.bower.filesNeeded.less || [];
    appConfig.bower.filesNeeded.css = appConfig.bower.filesNeeded.css || [];
    appConfig.bower.filesNeeded.html = appConfig.bower.filesNeeded.html || [];
    appConfig.bower.filesNeeded.assets = appConfig.bower.filesNeeded.assets || [];


    appConfig.port = appConfig.port || 9000;
    appConfig.cssCompiler = appConfig.cssCompiler || 'sass';
    appConfig.testRunner = appConfig.testRunner || 'karma';
    appConfig.useJsHint = typeof appConfig.useJsHint === 'undefined' ? true : appConfig.useJsHint;
    appConfig.usesAngularJS = appConfig.usesAngularJS || false;
    appConfig.usesCoffeeScript = appConfig.usesCoffeeScript || false;


    if (appConfig.cssCompiler === 'sass') {
        appConfig.__cssCompilerExtension = 'scss';
    }
    if (appConfig.cssCompiler === 'less') {
        appConfig.__cssCompilerExtension = 'less';
    }

};
