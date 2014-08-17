/*
 * less import compiler
 *
 *
 * Based on sass import compiler by Justin Worsdale
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('less_import_compiler',
        'accepts an array of less files and writes them to @imports for a main less file',
        function () {

            // Merge task-specific and/or target-specific options with these defaults.
            var options = this.options({
                keepExtensions: false
            });

            // Iterate over all specified file groups.
            this.files.forEach(function (fileobj) {

                var fileContents = '',
                    dest = fileobj.dest,
                    src = fileobj.src,
                    destpath = path.dirname(dest),
                    pathRelative,
                    i = 0;

                for (; i < src.length; i++) {

                    if (i > 0) {
                        fileContents += '\n';
                    }

                    pathRelative = path.relative(destpath, src[i]);

                    if (!options.keepExtensions) {

                        pathRelative = pathRelative.replace(/\.less/, '');
                    }

                    fileContents += '@import \'' + pathRelative + '\';';
                }

                grunt.file.write(fileobj.dest, fileContents);
            });
        });

};
