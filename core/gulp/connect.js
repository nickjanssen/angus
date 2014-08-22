'use strict';

var connect  = require('gulp-connect');

var LIVERELOAD_PORT = 35729;
var liveReload = require('connect-livereload')({port: LIVERELOAD_PORT});

var modRewrite = require('connect-modrewrite');

var middleware = function (connect, options) {
    return [
        liveReload,
        modRewrite([
            '^[^\\.]*$ /index.html [L]'
        ]),
        connect.static(options.root.join('')) // Serve static files
    ];
};

module.exports = function (angus) {
    return function () {
        return connect.server({
            root: [angus.appPath + '/dist/'],
            port: angus.appConfig.port,
            livereload: true,
            middleware: middleware
        });
    };
};
