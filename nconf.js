'use strict';

// nconf.js - setup configuration
var nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. 'config.json'
//
nconf.argv()
    .env()
    .file({ file: __dirname + '/config.json' });

// if not provided use these values
nconf.defaults({
    app: 'hello-world',
    port: 9000,
});

// send this configured reference
module.exports = nconf;
