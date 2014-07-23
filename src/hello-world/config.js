'use strict';

module.exports = {

    // These files are put in the /lib folder.
    // Angus will look for files defined here in this folder include them in your app.
    // You can install components using Bower, but you can also add
    // custom closed source libraries here.
    libIncludes: {

        // e.g. 'angular-ui/src/dropdown/dropdown.js',
        js: [],

        // Templates are an array of objects, to deal with html2js caching
        // e.g.
        // {
        //     libPath: 'angular-ui/template/modal/backdrop.html',
        //     readAs: 'template/modal/backdrop.html'
        // }
        templates: [],

        // e.g. 'bootstrap-sass-official/assets/stylesheets/bootstrap.scss',
        scss: []
    },

    // A list of grunt tasks to use, in any order. Angus will have many tasks
    // predefined in the right order, you simple need to enable them here.
    gruntTasks: [
        'clean',
        'concat',
        'copy',
        'html2js',
        'includeSource',
        'jshint',
        'ngconstant',
        'ngmin',
        'replace',
        'sass',
        'sass_import_compiler',
        'uglify'
    ],

    // ngconstant will parse this object and allow you to access them in your app
    constants: {}
};
