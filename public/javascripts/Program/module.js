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
            $routeProvider.when('/programs', {
                templateUrl: '/views/programs',
                controller: 'ProgramsCtrl'
            });
            $routeProvider.when('/programs/:program', {
                templateUrl: '/views/program',
                controller: 'ProgramCtrl'
            });
            plangularConfigProvider.clientId = 'ddb5c1c24a58abe1a706af0425eda325';
        }])
        .controller('ProgramsCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.go = function ( path ) {
                $location.path( path )
            };
        }])
        .controller('ProgramCtrl', ['$scope',function($scope) {
            $scope.urlPrograms = [];
            $scope.urlPrograms[0] = "https://soundcloud.com/iamlpmusic/lost-on-you";
            $scope.urlPrograms[1] = "https://soundcloud.com/msmsmsm/sophie-hard"
        }]);
});