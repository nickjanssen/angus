#!/usr/bin/env node

var cwd = process.cwd();
var argv = require('minimist')(process.argv.slice(2));
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');

updateNotifier({packageName: pkg.name, packageVersion: pkg.version}).notify();

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

            var cmd = 'cp -r apps/' + example + ' ' + cwd + '/' + args[1];
            shell.exec(cmd);
        }
    }
    else {
        require('./core/gulpfile.js')(args, cwd);
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
        '',
        'Any other command will be parsed as a gulp task. Please see the angus/core/gulp/ folder for available tasks.'].join('\n'));
}


