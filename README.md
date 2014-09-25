Angus
=====

A declarative build tool for the web, favoring [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration).

![angus logo](http://i.imgur.com/NY8t6v2.jpg)

## Slides

Check out this [slides presentation](http://slides.com/nickjanssen/declarative-build-configurations) of what Angus is all about!

## Table Of Contents

* <a href="#introduction">Introduction</a>
* <a href="#features">Features</a>
* <a href="#quick-start">Quick Start</a>
* <a href="#commands">Commands</a>
* <a href="#bower">Bower</a>
* <a href="#app-structure">App Structure</a>
* <a href="#tips">Tips</a>
* <a href="#migrating">Migrating</a>

## Introduction

Scaffolding tools such as Brunch and Yeoman are great, but are a headache when you need to build and maintain several apps. Web apps usually have the same requirements in terms of build tooling:

* Test the code
* Clean the build directory
* Copy source files to the build folder
* Do some magic tricks on your copied files, such as replacing variable names
* Compile Less or Sass files
* Dynamically generate script tags for your index.html
* Run a webserver to test out your app locally
* Watch for code changes and re-build

Having these build steps generated for you becomes a maintenance nightmare when you want to change something.

Angus solves these problems by turning the build process into something generic and reusable. It simplifies your build configuration by making it declarative, telling Angus how you'd like your sandwich instead of making the sandwich yourself. No more fiddling with Grunt/Gulpfiles!

## Features
* Pre-configured build system
* Super fast using streams
* Declarative build config
* Framework agnostic
* Easily define libraries your app is using
* Integrated connect server with pushState support
* Auto refresh when files change
* Soft CSS refresh
* Built-in unit testing (see `testRunner` config option)
* Auto-compile Sass or Less
* Automatically references scripts, templates and CSS in your `.html` files
* Easily make a production build using `angus prod` (minified and concatenated)
* Deploy directly to Amazon S3 using `angus s3`
* Serve static resources from a CDN on production
* Unique sounds on build success and break (No more boring system beeps!)

# Quick start
Install Angus globally with npm
```
npm install -g angus
```

Create an example app somewhere
```
angus create my-app
```

Enter the newly created app folder
```
cd my-app
```

Run the app
```
angus dev
```

Open your browser and navigate to
```
http://localhost:9000/
```

### Commands
Internally Angus uses GulpJS to do most of the work. The following commands can be invoked.
**These commands are to be run from the folder which contain your app sources.**

### `angus create app-name [--example=example-name]`
Creates an app from one of the supplied examples (see `angus/apps/`). By default, it uses `hello-world-jquery`. You can pass in `--example=example-name` to copy from a different example app. Send in a Pull Request for more examples!

### `angus dev`
Builds and serves your app for **development**. Files will not be minified nor concatenated.

### `angus prod`
Builds and serves your app for **production**. Files will be minified and concatenated.

### `angus s3`
Builds and serves your app for **production** and **deploys it to S3**. Files will be minified and concatenated. See the `aws` object below in your `angus.config.js`.

### `angus sound on|off`
Configures Angus to use sounds on build success/failure. By default disabled.

The compiled files can be found inside the `dist/` folder.

## Bower

Bower is used to install and maintain frontend dependencies. Angus doesn't use any `bower.json` files. You should not manually use `bower` commands.

Instead, when you run the `angus dev` or `angus prod` command, Angus will tell Bower which libraries to install for your app, before starting the build.

You define Bower libraries inside your `angus.config.js` using the `bower.packages` array.

Most Bower packages contain different flavors of the actual library. These include a minified and/or production build, special feature builds as well libraries that are broken down into many smaller components, such as bootstrap. Using the `filesNeeded` array, you can define which files you actually need from the Bower packages you install.

## App structure

Apps that use Angus are structured this way:
```
hello-world/
    bower_components/
    src/
        assets/
        style/
            _includes.scss <-- GENERATED
            main.scss
        core/
        index.html
    angus.config.js
```

### `angus.config.js`
This file is the heart of your app and defines what your app needs as well as a few build options. It is a `.js` and not a `.json` file on purpose so you can add comments.

It contains a few variables:
##### `bower.packages`
A list of bower dependencies this app will use. Each package will be installed using the command 'bower install [package]'
Remember that you can also use git repo's, local folders, URL's and specify version and/or tags.
Please see the [Bower API docs](http://bower.io/docs/api/#install) for more info.

##### `bower.filesNeeded`
An object that contains a few lists of files your app will actually use from the bower packages you installed. Once Angus has installed the bower packages needed for your app, you need to define which files you will actually need from those packages. This way, Angus can automatically include them in your HTML files, generate CSS and do additional (optional) things such as AngularJS template caching.

Angus will look inside the bower_components folder for these files.
You can specify `.js`, `.scss`, `.html and `.less` files here. You can also specify asset files using the `assets` array. These assets will then be copied from the bower package into your `assets/` folder.

Note that you can use wildcards and exclamation marks (e.g. `my-app/**/*.js` and `!my-app/not-this-file.js`).

##### `bower.localFolders` (optional)
An array of folders in your root app directory. These folders will be symlinked to `bower_components/<folder>`, allowing you to specify additional local library files that need to be loaded using the `bower.filesNeeded` object.

For example, if you had a `customers/` folder with separate configuration JS files, you could simply add this folder `bower.localFolders = ['customers']` and then reference them inside `bower.filesNeeded.js` (e.g. `customers/disney/config.js`) so your app loads the file automatically in the order you specified.

##### `port` (optional)
The port your local server which will be listening to when running Angus. Defaults to `9000`

##### `cssCompiler` (optional)
Which CSS compiler to use. Can be `none`, `sass` or `less`.
Defaults to `sass`

##### `testRunner` (optional)
Which test runner to use. Can be `none` or `karma`.
Defaults to `karma`

##### `useJsHint` (optional)
Whether or not Angus should report JSHint errors. Angus will not break when errors are found, only warn you about them.
Defaults to `true`

##### `usesAngularJS` (optional)
When true, Angus will execute additional AngularJS specific tasks. These include `ng-annotate` and `html2js`.
Defaults to `false

##### `aws` (optional)
If you wish to be able to deploy to Amazon S3, you can add the `aws` object which contains these variables: `key`, `secret`, `bucket` and `region`. Run `angus deploy_s3` after you've set these up to deploy.

##### `staticServerUrl` (optional)
When given, angus will prepend all static resources with this URL on production. Common usecase is to upload your static files to a CDN (e.g. Amazon S3) and then add the URL of your bucket here.

Example `angus.config.js` file:
```
module.exports = {
    bower: {
        packages: [
            'angular',
            'bootstrap-sass-official'
        ],
        filesNeeded: {
            js: [
                'angular/angular.js'
            ],
            scss: [
                // Core bootstrap variables and mixins
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_variables.scss',
                'bootstrap-sass-official/assets/stylesheets/bootstrap/_mixins.scss'
            ]
        }
    },
    port: 9001,
    cssCompiler: 'sass',
    testRunner: 'karma',
    usesAngularJS: true
};
```

### `assets/`
Contains all images, videos, JSON files and other data which are static to your app.

### `core/`
All JavaScript files as well as additional SCSS and HTML templates go inside `src/core/` and you are free to structure them how you like (you can make sub folders). The reason this folder is called `core/` and not `js/` is that it allows you have a modular design. You can also place SASS files as well as html templates in the same folder as your javascript, to keep things organized. Sorting your app files by type (e.g. `js`, `scss`, `html`) is generally not recommended.

### `style/`
The folder for your sass/less files. If you're doing modular design (which you should), component specific files should be placed inside `core/` in their respective module e.g. `core/your-module/*.scss`.

One special note: the `style/` folder also contains an `_includes` file which gets auto generated. This file contains a list of all Bower Sass/Less files you need specified inside `angus.config.js`.

## Migrating
### 0.3.x → 0.4.x
Angus now uses GulpJS internally to do all its building.

Your Javascript files are now placed inside a folder `src/core/` of your app. This is done to keep your app more organised by separating style, assets and core files. It is also helpful for keeping a modular design, as you can place javascript, scss and html templates together in a folder of your choice. Please see the [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

Html templates that are converted using the html2js plugin for AngularJS apps are now placed inside a `angus.templates.lib` module instead of `templates_lib`. Likewise, regular templates are placed inside `angus.templates.app` instead of `templates`. Please update your app dependencies accordingly. **Note that when you do not have any HTML templates or you did not include any library HTML templates, these modules will not be available.**

The `scss/` or `less/` folder inside your app was renamed to `style/`, to have a uniform folder name across different CSS compilers.

The `deploy_s3` command was renamed to `s3`.

In your `src/*.html` files (usually just `index.html`) the autoInclude syntax was changed to be consistent and easier to use:
```
<!-- autoInclude: css !-->
<!-- autoInclude: jsLib !-->
<!-- autoInclude: jsApp !-->
```

JSHint will no longer break the build when errors when found, only warn you about them (now with helpful sounds!)

Angus will no longer re-install every bower package if it was already present inside `bower_components/`. This was done to have a faster build script. However, your dependencies may run out of date faster. Consider pruning your `bower_components` folder from time to time.

Angus now places your compiled css file inside `assets/`. This allows you to specify images without having to use `assets/` as a prefix. For example, if you had `assets/images/foo.png` this now becomes `images/foo.png`.

### 0.2.x → 0.3.x
The config file went through a drastic change. You can no longer specify which grunt tasks are ran manually. The idea is that the build config per app becomes declarative and as easy to use as possible. Instead, you now tell the `angus.config.js` which CSS compiler and test runner you'd like to use. You can also tell Angus whether you'd like to use JsHint and whether your app uses AngularJS for added functionality.

The main entry point for the CSS compiler, the main file which includes other Less/Sass files was changed from `app.scss` to `main.scss`.

(Applies to AngularJS users) The constants task was removed, as it is very easy to simply include a file where you define your constants in AngularJS. Angus will auto include this file.

### 0.1.x → 0.2.x
Angus is now installed globally via `npm`. You no longer need to clone this repository or build your apps inside its `apps/` directory. See <a href="#quick-start">Quick Start</a>.

## License
MIT
