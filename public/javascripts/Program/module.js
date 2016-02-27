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
        .controller('ProgramCtrl', ['$scope', '$routeParams',function($scope, $routeParams) {
            $scope.urlProgram = "https://soundcloud.com/iamlpmusic/lost-on-you";
        }]);
});