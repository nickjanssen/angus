'use strict';

module.exports = function (grunt, angus) {

    grunt.task.registerTask('checkConfig', '', function () {

        grunt.log.writeln(('Checking angus.config.js of ' +
            angus.appName).yellow);

        // Do config checks
        var validate = require('jsonschema').validate;
        var result = validate(angus.appConfig, require('../app.config.json'));

        result.errors.forEach(function (error) {
            grunt.fail.fatal(error.stack.replace('instance.', 'angus.config.js: '));
        });

        grunt.log.writeln('Looks good.'.green);

    });

};
