'use strict';

var ngHtml2Js = require('gulp-ng-html2js');

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
    jsLib: function (angus, gulp) {
        return gulp.src(angus.appConfig.bower.filesNeeded.js.map(function (filePath) {
            return angus.appPath + '/bower_components/' + filePath;
        }), {
            base: angus.appPath + '/'
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
    }
};
