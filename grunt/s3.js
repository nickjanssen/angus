'use strict';

module.exports = function (angus) {
    return {
        options: {
            key: '<%= appConfig.aws.key %>',
            secret: '<%= appConfig.aws.secret %>',
            bucket: '<%= appConfig.aws.bucket %>',
            region: '<%= appConfig.aws.region %>',
            access: 'public-read',
            headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                'Cache-Control': 'max-age=630720000, public',
                'Expires': new Date(Date.now() + 63072000000).toUTCString()
            }
        },
        dev: {
            options: {
                verify: true
            },

            upload: [{
                src: angus.appPath + '/dist/prod/**/*',
                dest: '/',
                rel: angus.appPath + '/dist/prod',
                options: {
                    gzip: true
                }
            }]
        }
    };
};
