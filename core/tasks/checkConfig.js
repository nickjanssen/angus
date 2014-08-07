'use strict';

var buildConfig = require('../../nconf.js');
var appConfig = require('../../apps/' + buildConfig.get('app') + '/config.js');

module.exports = function (grunt) {

    grunt.task.registerTask('checkConfig', '', function () {

        grunt.log.writeln(('Checking config.js of ' +
            buildConfig.get('app')).yellow);

        // Do config checks
        var validate = require('jsonschema').validate;
        var result = validate(appConfig, require('../app.config.json'));

        result.errors.forEach(function (error) {
            grunt.fail.fatal(error.stack.replace('instance.', 'apps/' +
                buildConfig.get('app') + '/config.js: '));
        });

        grunt.log.writeln('Looks good.'.green);

    });

};
