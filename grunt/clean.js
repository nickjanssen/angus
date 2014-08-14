'use strict';

module.exports = function (angus) {
    return {
        options: {
            force: true
        },
        dev: {
            src: [
                angus.appPath + '/dist/dev/',
                angus.appPath + '/dist/tmp/'
            ]
        },
        prod: {
            src: [
                angus.appPath + '/dist/prod/',
                angus.appPath + '/dist/tmp/'
            ]
        }
    };
};
