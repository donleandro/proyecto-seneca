/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';
define([
    'angular',
    'angularRoute',
    'Home/services'
], function(angular) {
    angular.module('radio.home', ['ngRoute', 'homeServices'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/views/home',
                controller: 'HomeCtrl'
            });
        }])
        .controller('HomeCtrl', ['$scope', 'HomeInfo',
            function($scope, HomeInfo) {
                HomeInfo.getInfo().$promise.then(function(homeInfo){
                    $scope.homeInfo = homeInfo;
                    $scope.selected = homeInfo[0];
                });
            }
        ]);
});