'use strict';

module.exports = function (angus) {
    return {
        unit: {
            options: {
                files: [
                    angus.appPath + '/tests/**/*.js'
                ]
            },
            frameworks: ['jasmine'],
            plugins: [
                'karma-jasmine',
                'karma-phantomjs-launcher'
            ],
            singleRun: true,
            browsers: ['PhantomJS']
        }
    };
};
