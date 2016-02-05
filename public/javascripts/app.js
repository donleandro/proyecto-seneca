/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';

define([
    'angular',
    'angularRoute',
    'Home/module',
    'Program/module'
], function(angular) {
    return angular.module('radio', [
        'ngRoute',
        'radio.home',
        'radio.program'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]).
    controller('HeaderCtrl', ['$scope', function($scope){
        $scope.test = "Esto es un header con angular"
    }]).
    controller('FooterCtrl', ['$scope', function($scope){
        $scope.test = "Esto es un footer con angular"
    }]);
});