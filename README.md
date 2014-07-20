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

## AngularJS

Angus specifically focuses on AngularJS, as this framework tends to have a lot of reusable components available, and lets you easily write reusable stuff using its module system.

# Quick start

Clone this repository somewhere.
`git clone git@github.com:nickjanssen/angus.git`

Enter the repo folder:
`cd angus`

Install NPM dependencies:
`npm install`

Install Angular using Bower:
`bower install angular`

Run the Hello World app:
`grunt dev`

Open your browser and navigate to `http://localhost:9000/`

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

Bower is used to install and maintain frontend dependencies. Instead of the lengthy `bower_components` these are placed inside a `lib/` folder. The idea behind this change, is that it allows you to add custom libraries that do not necessarily need to be open-source, but still form part of the library of your personalised Angus installation.

Everything else is the same. Simply add packages using `bower install <package>` and they will be placed inside `lib/`

## Apps

Apps are contained within the `src/` folder. Each app has its own folder. They are structured this way:

### `config.js`
This file is the heart of your app and defines Javascript and CSS/SCSS dependencies. It is a `.js` and not a `.json` file on purpose, to allow you to add comments and optionally more complex logic.

It contains a few variables:
#### `includes`
Contains a `js` and `scss` array of libraries. These check inside the `lib/` folder of Angus. They will be included automatically in your app.

#### `constants`
Using `grunt-ng-constant` these variables are automatically included in your AngularJS app as a constant dependency. After building, you will find a `constants.js` in the root of your app folder which contains these definitions.

Example `config.js` file:
```
module.exports = {
    includes: {
        js: [
            'angular-file-upload/angular-file-upload.js'
        ],
        scss: [
            'bootstrap-sass-official/assets/stylesheets/bootstrap'
        ]
    },
    constants: {
        'firebaseConfig': {
            'url': 'https://myapp.firebaseio.com/',
        }
    }
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


