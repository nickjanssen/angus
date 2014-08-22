'use strict';

var karma = require('karma').server;

module.exports = function (angus) {
    return function (done) {
        karma.start({
            browsers: ['PhantomJS'],
            files: [ angus.appPath + '/tests/**/*.js'],
            frameworks: ['jasmine'],
            singleRun: true
        }, function (exitCode) {
            console.log('Karma has exited with ' + exitCode);
            if (exitCode === 0) {
                done();
            }
        });
    };
};
