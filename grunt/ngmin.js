'use strict';

module.exports = {
    prod: {
        files: [{
            src: [
                'app.min.js'
            ],
            cwd: 'dist/prod/assets/js/app/',
            dest: 'dist/prod/assets/js/app/',
            expand: true
        }]
    }
};
