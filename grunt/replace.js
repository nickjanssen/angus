'use strict';

module.exports = {
    dev: {
        options: {
            variables: {
                app: '<%= cfg.app %>',
                minified: ''
            }
        },
        files: [{
            expand: true,
            flatten: true,
            src: [
                './dist/dev/index.html'
            ],
            dest: './dist/dev/'
        }]
    },
    prod: {
        options: {
            variables: {
                app: '<%= cfg.app %>',
                minified: '.min'
            }
        },
        files: [{
            expand: true,
            flatten: true,
            src: [
                './dist/prod/index.html'
            ],
            dest: './dist/prod/'
        }]
    }
};
