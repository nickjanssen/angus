'use strict';

module.exports = {
    files: [
        '*.js',
        'src/<%= cfg.app %>/**/*.js',
        '!dist/**/*.js',
        '!node_modules/**/*.js',
        '!bower_components/**/*.js',
        '!src/<%= cfg.app %>/**/_*.js'
    ],
    options: {
        jshintrc: '.jshintrc',
        ignores: []
    }
};
