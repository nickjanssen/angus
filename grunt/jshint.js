'use strict';

module.exports = {
    files: [
        '**/*.js',
        '!dist/**/*',
        '!node_modules/**/*',
        '!lib/**/*',
        '!src/**/constants.js',
    ],
    options: {
        jshintrc: '.jshintrc',
        ignores: []
    }
};
