/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';
define([
    'angular',
    'angularRoute',
    'plangular'
], function(angular) {
    angular.module('radio.program', ['ngRoute', 'plangular'])
        .config(['$routeProvider', 'plangularConfigProvider', function($routeProvider, plangularConfigProvider) {
            $routeProvider.when('/programs/:program', {
                templateUrl: '/program',
                controller: 'ProgramCtrl'
            });
            plangularConfigProvider.clientId = 'ddb5c1c24a58abe1a706af0425eda325';
        }])
        .controller('ProgramCtrl', ['$scope',function($scope) {
            $scope.urlPrograms = [];
            $scope.urlPrograms[0] = "https://soundcloud.com/iamlpmusic/lost-on-you";
            $scope.urlPrograms[1] = "https://soundcloud.com/msmsmsm/sophie-hard"
        }]);
});