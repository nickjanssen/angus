'use strict';

module.exports = function (angus) {
    return {
        options: {
            banner: '/*! <%= appName %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        prod: {
            files: {
                '<%= concat.prod.dest %>': ['<%= concat.prod.dest %>']
            }
        }
    };
};
