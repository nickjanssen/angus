#!/usr/bin/env node
'use strict';

var cwd = process.cwd();
var argv = require('minimist')(process.argv.slice(2));
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');

updateNotifier({packageName: pkg.name, packageVersion: pkg.version}).notify();

var writeConfig = function (data) {
    fs.writeFileSync(__dirname + '/config.json', JSON.stringify(data, null, 4));
};

if (!fs.existsSync(__dirname + '/config.json')) {
    console.log(cwd);
    writeConfig({});
}

var angusConfig = require('./config.json');
require('./core/setAngusConfigDefaults.js')(angusConfig);

var args = argv._;
if (args.length > 0) {

    var shell = require('shelljs');
    shell.cd(__dirname);

    var cmd = '';

    if (args[0] === 'create') {
        if (args.length === 1) {
            console.log(['usage: angus create <app-name> [--example=<example-app>]',
            '',
            'Example apps: hello-world-angular hello-world-jquery'].join('\n'));
        }
        else {
            var example = argv.example || 'hello-world-jquery';

            gulp.src('apps/' + example + '/**/*', {dot: true})
                .pipe(gulp.dest(args[1], {cwd: cwd}));
        }
    }
    else if (args[0] === 'sound') {
        if (args.length === 1) {
            console.log(['Build sounds are currently ' + (angusConfig.sound ? 'enabled' : 'disabled') + '.',
            '',
            'usage: angus sound on|off'].join('\n'));
        }
        else if (args[1] === 'on') {
            angusConfig.sound = true;
            writeConfig(angusConfig);
            var cmd = 'npm install wav speaker';
            shell.exec(cmd);
        }
        else if (args[1] === 'off') {
            angusConfig.sound = false;
            writeConfig(angusConfig);
            var cmd = 'npm uninstall wav speaker';
            shell.exec(cmd);
        }
    }
    else {
        var angusLocation = cwd + '/angus.config.js';
        if (fs.existsSync(angusLocation)) {
        require('./core/gulpfile.js')(args, cwd);
        } else {
            gutil.log(gutil.colors.red('angus.config.js was not found! Please check that you are in a valid angus directory.'));
            gutil.log(gutil.colors.yellow('If you would like to create an angus application, see the ') + gutil.colors.magenta('angus create') + gutil.colors.yellow(' command.'));
        }
    }

    if (cmd) {
        shell.exec(cmd);
    }

}
else {
    console.log(['usage: angus <command> [<args]',
        '',
        'create     Creates an app folder with basic structure',
        'dev        Runs Angus in development mode (must be inside app directory)',
        'prod       Runs Angus in production mode (must be inside app directory)',
        'sound      Configure Angus to use sounds on build success/failure',
        '',
        'Any other command will be parsed as a gulp task. Please see the angus/core/gulp/ folder for available tasks.'].join('\n'));
}


