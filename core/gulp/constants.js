'use strict';

var ngConstant = require('gulp-ng-constant');

module.exports = function (angus, gulp) {
    return function () {
        return gulp.src('core/constants.json')
          .pipe(ngConstant({
            name: 'constants',
            constants: angus.appConfig.constants
          }))
          .pipe(gulp.dest(angus.appPath + '/dist/js'));
      };
};
