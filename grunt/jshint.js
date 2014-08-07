'use strict';

module.exports = {
    files: [
        '*.js',
        'apps/<%= cfg.app %>/**/*.js',
        '!dist/**/*.js',
        '!node_modules/**/*.js',
        '!bower_components/**/*.js',
        '!apps/<%= cfg.app %>/**/_*.js'
    ],
    options: {
        jshintrc: '.jshintrc',
        ignores: []
    }
};
