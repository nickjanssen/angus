Angus
=====

One build configuration for all your web apps.

![angus logo](http://i.imgur.com/NY8t6v2.jpg)

# Major Update - 0.2.0 (Aug 14)
Angus is now installed globally via `npm`. You no longer need to clone this repository or build your apps inside its `apps/` directory. See <a href="#quick-start">Quick Start</a>.

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

## Introducing Angus
Angus solves these problems by turning the build process into something generic and reusable. It allows you to specify libraries on a per-app basis, while still sharing the same build steps.

## Features
* Pre-configured build steps for all your apps
* Framework agnostic
* Easily define libraries your app is using
* Integrated connect server with pushState support
* Auto refresh when files change
* Soft CSS refresh
* Unit tests on every save using Karma (enable the `karma` task)
* Automatically includes all javascript, html templates and scss/css in your `index.html`
* Easily make a production build using `grunt prod` (minified and concatenated)
* Deploy directly to Amazon S3 using `grunt deploy_s3`
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
The idea is that Angus has all build tasks pre-configured. You simply need to enable them for your app. Think of it as a declarative approach to the build process.
No more Gruntfile fiddling!

## Bower

Bower is used to install and maintain frontend dependencies. Angus doesn't use any `bower.json` files. You should not manually use `bower` commands.

Instead, when you run the `angus dev` or `angus prod` command, Angus will tell Bower which libraries to install for your app, before starting the build.

You define Bower libraries inside your `angus.config.js` using the `packages` array.

Most Bower packages contain different flavors of the actual library. These include a minified and/or production build, special feature builds as well libraries that are broken down into many smaller components, such as bootstrap. Using the `libIncludes` array, you can define which files you actually need from the Bower packages you install.

## App structure

Apps that use Angus are structured this way:
```
hello-world/
    bower_components/
    src/
        assets/
        scss/
            _includes.scss <-- GENERATED
            main.scss
        _constants.js  <-- GENERATED
        app.js
        index.html
    angus.config.js
```

### `app.js` (example file)
All JavaScript files go inside `src/` and you are free to structure them how you like. I recommend to add an `app.js` as your main starting point. If you're using AngularJS, this is where you define your app module and its dependencies.

### `angus.config.js`
This file is the heart of your app and defines Javascript and CSS/SCSS dependencies. It is a `.js` and not a `.json` file on purpose, to allow you to add comments and optionally more complex logic.

It contains a few variables:
#### `packages`
A list of bower dependencies this app will use. Each package will be installed using the command 'bower install [package]'
Remember that you can also use git repo's, local folders, URL's and specify version and/or tags.
Please see the [Bower API docs](http://bower.io/docs/api/#install) for more info.

#### `port`
The port your local server which will be listening to when running Angus.

#### `libIncludes`
Contains a `js`, `tpl` and `scss` array of libraries. These look inside the `bower_components/` folder. They will be included automatically in your app.

#### `constants` (requires ngconstant task to be enabled)
Using `grunt-ng-constant` these variables are automatically included in your AngularJS app as a constant dependency. After building, you will find a `_constants.js` in the root of your app folder which contains these definitions.

#### `gruntTasks` (optional)
An array of grunt tasks to use, in any order. Angus will have many tasks predefined in the right order, you simply need to add them here to enable them. If you leave these out, Angus will take a default list of tasks from `core/defaultTasks.js`

#### `gruntTasksAdd` (optional)
In addition to the list of tasks you specified, either by the `gruntTasks` variable above or the default task list provided by Angus, also execute these tasks in addition.

#### `gruntTasksIgnore` (optional)
In the list of tasks you specified, either by the `gruntTasks` variable above or the default task list provided by Angus, ignore these tasks.

#### `aws` (optional)
If you wish to be able to deploy to Amazon S3, you can add the `aws` object which contains these variables: `key`, `secret`, `bucket` and `region`. Run `grunt deploy_s3` after you've set these up to deploy.

#### `staticServerUrl` (optional)
When given, angus will prepend all static resources with this URL on production. Common usecase is to upload your static files to a CDN (e.g. Amazon S3) and then add the URL of your bucket here.

Example `angus.config.js` file:
```
module.exports = {
    packages: [
        'angular'
    ],

    port: 9000,

    libIncludes: {

        js: [
            'angular/angular.js'
        ],

        tpl: [
            {
                libPath: 'angular-ui/template/modal/backdrop.html',
                readAs: 'template/modal/backdrop.html'
            }
        ]

        scss: [
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_variables.scss',
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_mixins.scss',
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_normalize.scss',
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_scaffolding.scss',
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_grid.scss',
            'bootstrap-sass-official/assets/stylesheets/bootstrap/_modals.scss'
        ]
    },

    constants: {
        // In your app, you can inject myAppConfig and access its data
        myAppConfig: {
            articlesToShowPerPage: 20
        }
    }
};
```

### `assets/`
Contains all images, videos, JSON files and other data which are static to your app.

### `scss/`
The folder for your sass files.

One special note: the `scss/` folder also contains an `_includes.scss` file which gets auto generated. This file contains all Sass library definitions you have put inside `angus.angus.config.js`.

### Final note
If you're using AngularJS, I recommend that you add a `components` folder and structure your AngularJS files in there in a modularized fashion.
Please see the [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

## License
MIT
