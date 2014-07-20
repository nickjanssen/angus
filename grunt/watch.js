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
            '!node_modules/**/*'
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
    gruntfile: {
        options: {
            livereload: 35730
        },
        files: [
            'Gruntfile.js',
            'grunt/**/*'
        ],
        tasks: ['build_dev']
    },

    // Dummy to prevent grunt from exiting when doing 'grunt prod'
    dummy: {
        options: {
            livereload: 35730
        },
        files: [],
        tasks: []
    }
};
