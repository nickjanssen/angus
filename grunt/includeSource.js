'use strict';

module.exports = {
    dev: {
        options: {
            basePath: 'dist/dev/',
            ordering: 'top-down'
        },
        files: {
            'dist/dev/index.html': 'dist/dev/index.html'
        }
    },
    prod: {
        options: {
            basePath: 'dist/prod/',
            ordering: 'top-down'
        },
        files: {
            'dist/prod/index.html': 'dist/prod/index.html'
        }
    }
};
