'use strict';

var LIVERELOAD_PORT = 35730;
var liveReload = require('connect-livereload')({port: LIVERELOAD_PORT});

//MODIFIED: add require for connect-modewrite
var modRewrite = require('connect-modrewrite');

var middleware = function (connect, options) {
    return [
        liveReload,
        modRewrite(['!^/assets/.*$ /index.html [L]']),
        connect.static(options.base[0]) // Serve static files
    ];
};

module.exports = function (angus) {
    return {
        dev: {
            options: {
                port: angus.appConfig.port,
                base: angus.appPath + '/dist/dev/',
                hostname: '*',
                middleware: middleware
            }
        },
        prod: {
            options: {
                port: angus.appConfig.port,
                base: angus.appPath + '/dist/prod/',
                hostname: '*',
                middleware: middleware
            }
        }
    };
};
