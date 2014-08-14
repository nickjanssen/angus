'use strict';

module.exports = function (angus) {

    var filesDev = {};
    filesDev[angus.appPath + '/dist/dev/index.html'] = angus.appPath + '/dist/dev/index.html';

    var filesProd = {};
    filesProd[angus.appPath + '/dist/prod/index.html'] = angus.appPath + '/dist/prod/index.html';

    return {
        dev: {
            options: {
                basePath: angus.appPath + '/dist/dev/',
                ordering: 'top-down'
            },
            files: filesDev
        },
        prod: {
            options: {
                basePath: angus.appPath + '/dist/prod/',
                ordering: 'top-down',
                templates: {
                    html: {
                        js: '<script src="<%= appConfig.staticServerUrl %>{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="<%= appConfig.staticServerUrl %>{filePath}" />',
                    }
                }
            },
            files: filesProd
        }
    };
};
