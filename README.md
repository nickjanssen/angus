Angus
=====

One build configuration for all your web apps.

![angus logo](http://i.imgur.com/NY8t6v2.jpg)

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

Having these build steps generated for you becomes a maintenance nightmare when you want to change a step.

Angus solves these problems by turning the build process into something generic and reusable. It allows you to specify libraries on a per-app basis, while still sharing the same build steps.

## Features
* Pre-configured build steps for all your apps
* Declarative build config
* Framework agnostic
* Easily define libraries your app is using
* Integrated connect server with pushState support
* Auto refresh when files change
* Soft CSS refresh
* Unit tests on every save using Karma (see `testRunner` config option)
* Auto compile Sass or Less
* Automatically includes scripts, templates and CSS in your `index.html`
* Easily make a production build using `grunt prod` (minified and concatenated)
* Deploy directly to Amazon S3 using `angus deploy_s3`
* Serve static resources from a CDN on production

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
Internally Angus uses GruntJS to do most of the work. There are three important commands:

### `angus create app-name [--example=example-name]`
Creates an app from one of the supplied examples inside `angus/apps/`. By default, it uses `hello-world-jquery`. You can pass in `--example=example-name` to copy from a different example app.

### `angus dev [--app=app-name]`
Builds and serves a configured app for **development**. Files will not be minified nor concatenated.

### `angus prod [--app=app-name]`
Builds and serves a configured app for **production**. Files will be minified and concatenated.

For both commands, you can find the built files inside the `dist/` folder.

### How does it work?
The idea is that Angus has all build tasks pre-configured. You simple tell Angus what your app needs and how you'd like it to be built. Think of it as a declarative approach to the build process.
No more Gruntfile fiddling!

## Bower

Bower is used to install and maintain frontend dependencies. Angus doesn't use any `bower.json` files. You should not manually use `bower` commands.

Instead, when you run the `angus dev` or `angus prod` command, Angus will tell Bower which libraries to install for your app, before starting the build.

You define Bower libraries inside your `angus.config.js` using the `bower.packages` array.

Most Bower packages contain different flavors of the actual library. These include a minified and/or production build, special feature builds as well libraries that are broken down into many smaller components, such as bootstrap. Using the `libIncludes` array, you can define which files you actually need from the Bower packages you install.

## App structure

Apps that use Angus are structured this way:
```
hello-world/
    bower_components/
    src/
        assets/
        scss/       <-- (Angus can also use LESS)
            _includes.scss <-- GENERATED
            main.scss
        *.js
        index.html
    angus.config.js
```

### `app.js` (example file)
All JavaScript files go inside `src/` and you are free to structure them how you like (you can make sub folders).

### `angus.config.js`
This file is the heart of your app and defines what your app needs as well as a few build options. It is a `.js` and not a `.json` file on purpose so you can add comments.

It contains a few variables:
#### `bower.packages`
A list of bower dependencies this app will use. Each package will be installed using the command 'bower install [package]'
Remember that you can also use git repo's, local folders, URL's and specify version and/or tags.
Please see the [Bower API docs](http://bower.io/docs/api/#install) for more info.

#### `bower.filesNeeded`
A list of files your app will actually use from the bower packages you installed. Once Angus has installed the bower packages needed for your app, you need to define which files you will actually need from those packages. This way, Angus can automatically include them in your HTML files, generate CSS and do additional (optional) things such as AngularJS template caching.

Angus will look inside the bower_components folder for these files.
You can specify `.js`, `.scss`, `.html and `.less` files here.

#### `port` (optional)
The port your local server which will be listening to when running Angus. Defaults to `9000`

##### `cssCompiler` (optional)
Which CSS compiler to use. Can be none, sass or less.
Defaults to sass

##### `testRunner` (optional)
Which test runner to use. Can be none or karma.
Defaults to karma

#### `aws` (optional)
If you wish to be able to deploy to Amazon S3, you can add the `aws` object which contains these variables: `key`, `secret`, `bucket` and `region`. Run `grunt deploy_s3` after you've set these up to deploy.

#### `staticServerUrl` (optional)
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

### `scss/` (or `less/`)
The folder for your sass/less files.

One special note: the `scss/` or `less/` folder also contains an `_includes` file which gets auto generated. This file contains a list of all Bower Sass/Less files you need specified inside `angus.config.js`.

### Tips
If you're using AngularJS, I recommend that you add a `components` folder and structure your AngularJS files in there in a modularized fashion.
Please see the [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

## Migrating
### 0.2.x → 0.3.x
The config file went through a drastic change. You can no longer specify which grunt tasks are ran manually. The idea is that the build config per app becomes declarative and as easy to use as possible. Instead, you now tell the `angus.config.js` which CSS compiler and test runner you'd like to use. You can also tell Angus whether you'd like to use JsHint and whether your app uses AngularJS for added functionality.

The main entry point for the CSS compiler, the main file which includes other Less/Sass files was changed from `app.scss` to `main.scss`.

(Applies to AngularJS users) The constants task was removed, as it is very easy to simply include a file where you define your constants in AngularJS. Angus will auto include this file.

### 0.1.x → 0.2.x
Angus is now installed globally via `npm`. You no longer need to clone this repository or build your apps inside its `apps/` directory. See <a href="#quick-start">Quick Start</a>.

## License
MIT
