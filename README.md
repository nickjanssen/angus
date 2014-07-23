Angus
=====
A scaffolding tool for building AngularJS apps.

## Why?

Popular build tools such as GruntJS and Yeoman are great, but are a headache when you need to build and maintain several apps.
Webapps usually have the same requirements in terms of build tooling:

* JSHint the code
* Clean the `dist/` directory
* Copy `src` files to the `dist/` folder
* Do some magic tricks on your copied files, such as `grunt-replace`, `html2js` or `ng-annotate`.
* Compile Less or Sass files
* Dynamically generate script tags for your `index.html`
* Run a webserver to test out your app locally
* Watch for code changes and re-build

A workflow like this is prone to change often, yet it is often very similar across different projects. Having these build steps generated for you can become a maintenance nightmare when you want to change a step. It is also harder to share reusable components across several apps.

## Introducing Angus

Angus solves these problems by turning the build process into something generic and reusable. It allows you to specify libraries on a per-app basis while still maintaining and updating them on a global level.

It also tries to instill the best practices of web app development. It comes with the best configuration and tools for the job. The ultimate goal is to let you build apps without wasting time.

Angus is just a simple scaffolding framework, where you build apps inside of the Angus repository. Every app is a directory inside the `src/` folder. Each app you make with Angus shares the same Gruntfile, but can define all the libraries they need on a per-app level.

## Features

+ One Gruntfile for all your apps
* Integrated connect server with pushState support
* Auto refresh on save
* Easily define libraries (likely bower) your app is using
* Automatically includes javascript, html templates and scss/css, both app specific and library includes in your `index.html`
* Easily make a production build using `grunt prod` (minified and concatenated)

## Why Grunt? There's Gulp and Brunch out there!

If you want the very latest, bleeding edge (and usually unstable) technology and you love Chrome Canary, this is probably not for you. Angus is made specifically to help you build and ship stable web apps **today**. Grunt has stood the test of time and has a huge amount of plugins available.

# Quick start

Clone this repository somewhere.
```
git clone git@github.com:nickjanssen/angus.git
```

Enter the repo folder:
```
cd angus
```

Install NPM dependencies:
```
npm install
```

Run the Hello World app:
```
grunt dev
```

Open your browser and navigate to
```
http://localhost:9000/
```

### How to use it?
Internally Angus uses grunt to do all the work. There are two important commands:

### `grunt dev [--app=YOURAPP]`
Builds and serves a configured app for **development**. Files will not be minified nor concatenated.

### `grunt prod [--app=YOURAPP]`
Builds and serves a configured app for **production**. Files will be minified and concatenated.

For both commands, you can find the built files inside the `dist/` folder.
You can also use the `app` parameter to specify an app to built, which is the name of a folder inside `src/`.

### `config.json`
If no `app` parameter is given, a `config.json` file in the root folder of Angus is checked. The file can contain these values:
```
{
    "app": "hello-world",
    "port": 9001
}
```

### How does it work?
Angus has  a `src/` folder which contains all your apps, including the example `hello-world`. The `src/` folder is ignored by git, and you can safely have sub-repositories inside. These sub-repositories are actual apps without all the extra files such as `Gruntfile.js`, `.jshintrc`, `package.json` etc, as these are maintained on a higher level.

Focus on building your app, let Angus take care of the rest.

## Bower

Bower is used to install and maintain frontend dependencies. Instead of the lengthy `bower_components` these are placed inside a `lib/` folder. The idea behind this change, is that it allows you to add custom libraries that do not necessarily need to be open-source, but still form part of the library of your Angus installation.

The `lib/` folder is ignored by git, and you can everything in here that you wish. Note that Angus doesn't use a `bower.json` either. The `lib/` folder should be seen as the place to store all your shared code, whether private or installed using bower or other means.

Everything else is the same. Simply add packages using `bower install <package>` and they will be placed inside `lib/`

## Apps

Apps are contained within the `src/` folder. Each app has its own folder. They are structured this way:
```
angus/
    src/
        hello-world/
            assets/
            scss/
                _includes.scss <-- GENERATED
                main.scss
            components/ <-- (recommended for best practices)
            app.js
            config.js
            _constants.js  <-- GENERATED
            index.html

```

### `app.js`
Your AngularJS starting point. Here is where you define your app's module and its dependencies.

### `config.js`
This file is the heart of your app and defines Javascript and CSS/SCSS dependencies. It is a `.js` and not a `.json` file on purpose, to allow you to add comments and optionally more complex logic.

It contains a few variables:
#### `libIncludes`
Contains a `js`, `tpl` and `scss` array of libraries. These check inside the `lib/` folder of Angus. They will be included automatically in your app.

#### `constants`
Using `grunt-ng-constant` these variables are automatically included in your AngularJS app as a constant dependency. After building, you will find a `_constants.js` in the root of your app folder which contains these definitions.

#### `gruntTasks`
An array of grunt tasks to use, in any order. Angus will have many tasks predefined in the right order, you simply need to add them here to enable them.

Example `config.js` file:
```
module.exports = {

    // These files are put in the /lib folder.
    // Angus will look for files defined here in this folder include them in your app.
    // You can install components using Bower, but you can also add
    // custom closed source libraries here.
    libIncludes: {

        // e.g. 'angular-ui/src/modal/modal.js',
        js: [],

        // HTML Templates are an array of objects, to deal with html2js caching
        // e.g.
        // {
        //     libPath: 'angular-ui/template/modal/backdrop.html',
        //     readAs: 'template/modal/backdrop.html'
        // }
        tpl: [],

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

```

### `assets/`
Contains all images, videos, JSON files and other data which are static to your app.

### `scss/`
The folder for your sass files.

One special note: the `scss/` folder also contains an `_includes.scss` file which gets auto generated. This file contains all Sass library definitions you have put inside `config.js`.

### Final note
I recommend that you add a `components` folder and structure your AngularJS files in there in a modularized fashion.
Please see the [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

## License
MIT


