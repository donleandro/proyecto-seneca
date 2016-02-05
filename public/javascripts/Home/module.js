/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('radio.home', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/home',
                controller: 'HomeCtrl'
            });
        }])
        .controller('HomeCtrl', ['$scope',function($scope) {
            $scope.test = "Ok Home";
        }]);
});