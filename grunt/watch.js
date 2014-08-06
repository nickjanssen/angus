'use strict';

module.exports = {
    js: {
        files: [
            'src/<%= cfg.app %>/**/*',
            '!src/<%= cfg.app %>/config.js',
            '!src/<%= cfg.app %>/scss/**/*',
            '!src/<%= cfg.app %>/**/_*'
        ],
        tasks: ['build_dev']
    },
    html: {
        files: [
            'src/<%= cfg.app %>/index.html'
        ],
        tasks: ['build_dev']
    },
    sass: {
        files: [
            'src/<%= cfg.app %>/scss/**/*',
            '!src/<%= cfg.app %>/**/_*'
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
            'src/<%= cfg.app %>/config.js',
            'core/app.config.json',
            'Gruntfile.js',
            'core/**/*',
            'grunt/**/*'
        ],
        tasks: ['check', 'build_dev']
    }
};
