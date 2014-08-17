'use strict';

module.exports = {

    bower: {
        /*  packages - The list of bower endpoints your app will use.

            Each package will be installed using the command 'bower install <package>'
            Remember that you can also use git repo's, local folders, URL's and specify version and/or tags
            Please see http://bower.io/docs/api/#install for more info
        */
        packages: [
            'http://code.jquery.com/jquery-2.1.0.min.js',
            'bootstrap'
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
                'jquery-2.1.0.min/index.js'
            ],

            less: [
                // Core variables and mixins
                'bootstrap/less/variables.less',
                'bootstrap/less/mixins.less',

                // Reset
                // 'bootstrap/less/normalize.less',
                // 'bootstrap/less/print.less',

                // Core CSS
                'bootstrap/less/scaffolding.less',
                // 'bootstrap/less/type.less',
                // 'bootstrap/less/code.less',
                'bootstrap/less/grid.less',
                // 'bootstrap/less/tables.less',
                'bootstrap/less/forms.less',
                'bootstrap/less/buttons.less',

                // Components
                // 'bootstrap/less/component-animations.less',
                // 'bootstrap/less/glyphicons.less',
                // 'bootstrap/less/dropdowns.less',
                'bootstrap/less/button-groups.less',
                // 'bootstrap/less/input-groups.less',
                // 'bootstrap/less/navs.less',
                // 'bootstrap/less/navbar.less',
                // 'bootstrap/less/breadcrumbs.less',
                // 'bootstrap/less/pagination.less',
                // 'bootstrap/less/pager.less',
                // 'bootstrap/less/labels.less',
                // 'bootstrap/less/badges.less',
                // 'bootstrap/less/jumbotron.less',
                // 'bootstrap/less/thumbnails.less',
                // 'bootstrap/less/alerts.less',
                // 'bootstrap/less/progress-bars.less',
                // 'bootstrap/less/media.less',
                // 'bootstrap/less/list-group.less',
                // 'bootstrap/less/panels.less',
                // 'bootstrap/less/wells.less',
                // 'bootstrap/less/close.less',

                // Components w/ JavaScript
                'bootstrap/less/modals.less'
                // 'bootstrap/less/tooltip.less',
                // 'bootstrap/less/popovers.less',
                // 'bootstrap/less/carousel.less',

                // Utility classes
                // 'bootstrap/less/utilities.less',
                // 'bootstrap/less/responsive-utilities.less',
            ]
        }
    },

    // The port this app will be accessible on.
    // Defaults to 9000
    port: 9000,

    // Which CSS compiler to use. Can be 'none', 'sass' or 'less'.
    // Defaults to 'sass'
    cssCompiler: 'less',

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
    usesAngularJS: false

};
