'use strict';

module.exports = {
    options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    prod: {
        files: {
            '<%= concat.prod.dest %>': ['<%= concat.prod.dest %>']
        }
    }
};
