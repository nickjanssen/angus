'use strict';

module.exports = {
    js: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/**/*',
            '!dist/**/*',
            '!grunt/**/*',
            '!node_modules/**/*',
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
    assets: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/assets/**/*'
        ],
        tasks: ['build_dev']
    },
    css: {
        options: {
            livereload: 35730
        },
        files: [
            'src/<%= cfg.app %>/scss/**/*'
        ],
        tasks: ['sass:dev']
    },
    lib: {
        options: {
            livereload: 35730
        },
        files: [
            'lib/**/*'
        ],
        tasks: ['build_dev']
    },
    angus: {
        options: {
            livereload: 35730
        },
        files: [
            'app.config.json',
            'Gruntfile.js',
            'grunt/**/*'
        ],
        tasks: ['build_dev']
    }
};
