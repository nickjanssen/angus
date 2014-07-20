'use strict';

angular.module('hello-world', [
    'constants',
    'templates_lib',
    'templates'
])
.controller('MainController', function ($scope) {

    $scope.welcome = 'Hello world!';

});
