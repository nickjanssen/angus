'use strict';

module.exports = {

    bower: {
        /*  packages - The list of bower endpoints your app will use.

            Each package will be installed using the command 'bower install <package>'
            Remember that you can also use git repo's, local folders, URL's and specify version and/or tags
            Please see http://bower.io/docs/api/#install for more info
        */
        packages: [
            'angular',
            'bootstrap-sass-official'
        ],
        /*  filesNeeded - A list of files your app will actually use from the bower packages you installed.

            Once Angus has installed the bower packages needed for your app, you need to define
            which files you will actually need from those packages. This way, Angus can automatically include
            them in your HTML files, generate CSS and do additional (optional) things such as AngularJS template caching.

            Angus will look inside the bower_components folder for these files.
            You can specify `.js`, `.scss`, `.html and `.less` files here.
        */
        filesNeeded: {
            js: [
                'angular/angular.js'
            ],

            scss: [
                // Core variables and mixins
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_variables.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_mixins.scss',

                // Reset
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_normalize.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_print.scss',

                // Core CSS
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_scaffolding.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_type.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_code.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_grid.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_tables.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_forms.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_buttons.scss',

                // Components
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_component-animations.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_glyphicons.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_dropdowns.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_button-groups.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_input-groups.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_navs.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_navbar.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_breadcrumbs.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_pagination.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_pager.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_labels.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_badges.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_jumbotron.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_thumbnails.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_alerts.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_progress-bars.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_media.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_list-group.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_panels.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_wells.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_close.scss',

                // Components w/ JavaScript
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_modals.scss'
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_tooltip.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_popovers.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_carousel.scss',

                // Utility classes
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_utilities.scss',
                // 'bootstrap-sass-official/assets/stylesheets/bootstrap/_responsive-utilities.scss',
            ],

            less: [],

            /*
                html - Only for AngularJS apps: include html templates here to cache them.
                This array must contain objects in the following format:

                {
                   libPath: 'angular-ui/template/modal/backdrop.html',
                   readAs: 'template/modal/backdrop.html'
                }
            */
            html: []
        }
    },

    // The port this app will be accessible on.
    // Defaults to 9000
    port: 9000,

    // Which CSS compiler to use. Can be 'none', 'sass' or 'less'.
    // Defaults to 'sass'
    cssCompiler: 'sass',

    // Which test runner to use. Can be 'none' or 'karma'.
    // Defaults to 'karma'
    testRunner: 'karma',

    // Whether JsHint should check your code for errors.
    // Note that you need a .jshintrc file in your project directory for this to work.
    // See the example apps for a good starting point.
    // Defaults to true
    useJsHint: true,

    // When enabled, Angus will execute a few additional tasks such as html2js, ngconstant and ngmin.
    // Defaults to false
    usesAngularJS: true

};
