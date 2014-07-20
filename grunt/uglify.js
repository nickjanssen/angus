'use strict';

module.exports = {
    options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    prod: {
        files: {
            './dist/prod/assets/app.min.js': ['<%= concat.prod.dest %>']
        }
    }
};
