'use strict';

module.exports = {
    files: [
        '*.js',
        'src/<%= cfg.app %>/**/*.js',
        '!dist/**/*.js',
        '!node_modules/**/*.js',
        '!lib/**/*.js',
        '!src/<%= cfg.app %>/**/_*.js'
    ],
    options: {
        jshintrc: '.jshintrc',
        ignores: []
    }
};
