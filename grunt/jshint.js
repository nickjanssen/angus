'use strict';

module.exports = function (angus) {
    return {
        files: [
            angus.appPath + '/src/**/*.js',
            angus.appPath + '/tests/**/*.js',
            '!' + angus.appPath + '/**/_*.js'
        ],
        options: {
            jshintrc: '.jshintrc',
            ignores: []
        }
    };
};
