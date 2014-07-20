'use strict';

module.exports = {
    prod: {
        files: [{
            src: [
                'app.min.js'
            ],
            cwd: 'dist/prod/assets/',
            dest: 'dist/prod/assets/',
            expand: true
        }]
    }
};
