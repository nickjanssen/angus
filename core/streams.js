'use strict';

var ngHtml2Js = require('gulp-ng-html2js');
var streamqueue = require('streamqueue');

module.exports = {
    jsApp: function (angus, gulp) {
        return gulp.src([
                angus.appPath + '/src/core/**/*.js',
                '!' + angus.appPath + '/src/core/**/*.e2e.*.js',
                '!' + angus.appPath + '/src/core/**/*.unit.*.js'
            ], {
            base: angus.appPath + '/src/'
        });
    },
    coffeeApp: function (angus, gulp) {
        return gulp.src([
                angus.appPath + '/src/core/**/*.coffee',
                '!' + angus.appPath + '/src/core/**/*.e2e.*.coffee',
                '!' + angus.appPath + '/src/core/**/*.unit.*.coffee'
            ], {
            base: angus.appPath + '/src/'
        });
    },
    jsLib: function (angus, gulp) {
        return gulp.src(angus.appConfig.bower.filesNeeded.js.map(function (filePath) {
            return angus.appPath + '/bower_components/' + filePath;
        }), {
            base: angus.appPath + '/'
        });
    },
    assetsLib: function (angus, gulp) {
        return gulp.src(angus.appConfig.bower.filesNeeded.assets.map(function (filePath) {
            return angus.appPath + '/bower_components/' + filePath;
        }), {
            base: angus.appPath + '/bower_components/'
        });
    },
    templatesApp: function (angus, gulp) {
        return gulp.src([
                angus.appPath + '/src/**/*.html',
                '!' + angus.appPath + '/src/*.html',
                '!' + angus.appPath + '/bower_components/**/*'
            ])
            .pipe(ngHtml2Js({
                moduleName: 'angus.templates.app',
                stripPrefix: 'core/'
            }));
    },
    templatesLib: function (angus, gulp) {
        var html = angus.appConfig.bower.filesNeeded.html;
        return gulp.src(!html.length ? 'no.files.found' : html.map(function (tpl) {
                return angus.appPath + '/bower_components/' + tpl.libPath;
            }), {
                base: angus.appPath + '/bower_components/'
            })
            .pipe(ngHtml2Js({
                moduleName: 'angus.templates.lib',
                rename: function (url) {
                    html.forEach(function (tpl) {
                        if (tpl.libPath === url) {
                            url = tpl.readAs;
                        }
                    });
                    return url;
                }
            }));
    },
    css: function (angus, gulp) {
        var cssLibFiles = angus.appConfig.bower.filesNeeded.css.map(function(filePath) {
            return angus.appPath + '/bower_components/' + filePath;
        });
        return streamqueue({
                objectMode: true
            },
            gulp.src(cssLibFiles, {
                base: angus.appPath
            }),
            gulp.src([
                angus.appPath + '/src/style/**/*.css'
            ], {
                base: angus.appPath + '/src/style/'
            }),
            gulp.src([
                angus.appPath + '/src/core/**/*.css'
            ], {
                base: angus.appPath + '/src/core/'
            })
        );
    },
};
