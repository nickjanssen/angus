'use strict';

var LIVERELOAD_PORT = 35730;
var liveReload = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

//MODIFIED: add require for connect-modewrite
var modRewrite = require('connect-modrewrite');

module.exports = {
    dev: {
        options: {
            port: 9001,
            base: 'dist/dev/',
            // change this to '0.0.0.0' to access the server from outside
            hostname: '*',
            middleware: function (connect, options) {
                return [
                    liveReload,

                    modRewrite(['!^/assets/.*$ /index.html [L]']),

                    // Serve static files
                    connect.static(options.base[0])
                ];
            }
        }
    },
    prod: {
        options: {
            port: 9001,
            // change this to '0.0.0.0' to access the server from outside
            hostname: '*',
            middleware: function (connect) {
                return [liveReload, mountFolder(connect, './dist/prod/')];
            }
        }
    }
};
