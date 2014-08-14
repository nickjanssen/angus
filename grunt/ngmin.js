'use strict';

module.exports = function (angus) {
    return {
        prod: {
            files: [{
                src: [
                    'app.min.js'
                ],
                cwd: angus.appPath + '/dist/prod/assets/js/app/',
                dest: angus.appPath + '/dist/prod/assets/js/app/',
                expand: true
            }]
        }
    };
};
