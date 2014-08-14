'use strict';

module.exports = function (angus) {

    var filesDev = {};
    filesDev[angus.appPath + '/dist/dev/assets/app.css'] = angus.appPath + '/src/scss/app.scss';

    var filesProd = {};
    filesProd[angus.appPath + '/dist/prod/assets/app.css'] = angus.appPath + '/src/scss/app.scss';

    return {
        dev: {
            options: {
                style: 'expanded'
            },
            files: filesDev
        },
        prod: {
            options: {
                style: 'compressed'
            },
            files: filesProd
        }
    };
};
