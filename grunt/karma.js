'use strict';

module.exports = {
    unit: {
        options: {
            files: [
                'apps/<%= cfg.app %>/tests/**/*.js'
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
