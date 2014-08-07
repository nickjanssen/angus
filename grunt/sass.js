'use strict';

module.exports = {
    dev: {
        options: {
            style: 'expanded'
        },
        files: {
            'dist/dev/assets/app.css': 'apps/<%= cfg.app %>/scss/app.scss'
        }
    },
    prod: {
        options: {
            style: 'compressed'
        },
        files: {
            'dist/prod/assets/app.css': 'apps/<%= cfg.app %>/scss/app.scss'
        }
    }
};
