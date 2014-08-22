'use strict';

var playSound = require('../playSound.js');

module.exports = function (angus, gulp) {

    var makeTaskList = require('../buildGulpTaskList.js');

    return function () {

        gulp.watch(angus.appPath + '/src/*.html', makeTaskList(angus, ['html']));
        gulp.watch(angus.appPath + '/src/core/**/*.js', makeTaskList(angus, ['js', 'autoInclude']));
        gulp.watch([
            angus.appPath + '/src/style/*.' + angus.appConfig.__cssCompilerExtension,
            '!' + angus.appPath + '/src/style/_includes.' + angus.appConfig.__cssCompilerExtension
        ], makeTaskList(angus, ['css']));
        // console.log(makeTaskList(angus, ['js', 'autoInclude']));
        gulp.watch(angus.appPath + '/angus.config.js', ['configFileChangedWarning']);

        playSound('start');

    };
};
