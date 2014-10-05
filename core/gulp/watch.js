'use strict';

var playSound = require('../playSound.js');

module.exports = function (angus, gulp) {

    var makeTaskList = require('../buildGulpTaskList.js');

    return function () {

        gulp.watch(angus.appPath + '/src/assets/**/*', makeTaskList(angus, ['assets']));
        gulp.watch(angus.appPath + '/src/*.html', makeTaskList(angus, ['html']));
        gulp.watch([
            angus.appPath + '/src/core/**/*.js',
            angus.appPath + '/src/core/**/*.tpl.html'
        ], makeTaskList(angus, ['js', 'autoInclude']));
        gulp.watch([
            angus.appPath + '/src/core/**/*.' + angus.appConfig.__cssCompilerExtension,
            angus.appPath + '/src/style/*.' + angus.appConfig.__cssCompilerExtension,
            '!' + angus.appPath + '/src/style/_includes.' + angus.appConfig.__cssCompilerExtension
        ], makeTaskList(angus, ['css']));
        gulp.watch(angus.appPath + '/angus.config.js', ['configFileChangedWarning']);

        playSound('start');

    };
};
