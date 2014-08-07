'use strict';

module.exports = {
    js: {
        files: [
            'apps/<%= cfg.app %>/**/*',
            '!apps/<%= cfg.app %>/config.js',
            '!apps/<%= cfg.app %>/scss/**/*',
            '!apps/<%= cfg.app %>/**/_*'
        ],
        tasks: ['build_dev']
    },
    html: {
        files: [
            'apps/<%= cfg.app %>/index.html'
        ],
        tasks: ['build_dev']
    },
    sass: {
        files: [
            'apps/<%= cfg.app %>/scss/**/*',
            '!apps/<%= cfg.app %>/**/_*'
        ],
        tasks: ['sass:dev']
    },
    livereload: {
        options: {
            livereload: 35730
        },
        files: [
            'dist/dev/**/*'
        ]
    },
    core: {
        files: [
            'apps/<%= cfg.app %>/config.js',
            'core/app.config.json',
            'Gruntfile.js',
            'core/**/*',
            'grunt/**/*'
        ],
        tasks: ['check', 'build_dev']
    }
};
