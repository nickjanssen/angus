'use strict';

module.exports = {
    js: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/**/*',
            '!src/<%= cfg.app %>/config.js',
            '!src/<%= cfg.app %>/scss/**/*',
            '!src/<%= cfg.app %>/**/_*'
        ],
        tasks: ['build_dev']
    },
    html: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/index.html'
        ],
        tasks: ['build_dev']
    },
    css: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/scss/**/*',
            '!src/<%= cfg.app %>/**/_*'
        ],
        tasks: ['sass:dev']
    },
    core: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/config.js',
            'core/app.config.json',
            'Gruntfile.js',
            'core/**/*',
            'grunt/**/*'
        ],
        tasks: ['check', 'build_dev']
    }
};
