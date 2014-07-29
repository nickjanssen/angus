'use strict';

module.exports = {
    options: {
        key: '<%= appcfg.aws.key %>',
        secret: '<%= appcfg.aws.secret %>',
        bucket: '<%= appcfg.aws.bucket %>',
        region: '<%= appcfg.aws.region %>',
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
            src: 'dist/prod/**/*',
            dest: '/',
            rel: 'dist/prod',
            options: {
                gzip: true
            }
        }]
    }
};
