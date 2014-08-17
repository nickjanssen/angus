'use strict';

module.exports = function (angus) {

    var filesDev = {};
    filesDev[angus.appPath + '/dist/dev/assets/app.css'] = angus.appPath + '/src/less/main.less';

    var filesProd = {};
    filesProd[angus.appPath + '/dist/prod/assets/app.css'] = angus.appPath + '/src/less/main.less';

    return {
        dev: {
            options: {
                compress: false
            },
            files: filesDev
        },
        prod: {
            options: {
                compress: true
            },
            files: filesProd
        }
    };
};
