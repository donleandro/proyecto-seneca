/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';
define([
    'angular',
    'angularRoute',
    'plangular',
    'Program/services',
    'angularSanitize'
], function(angular) {
    angular.module('radio.program', ['ngRoute', 'plangular', 'programServices', 'ngSanitize'])
        .config(['$routeProvider', 'plangularConfigProvider', function($routeProvider, plangularConfigProvider) {
            $routeProvider.when('/programs', {
                templateUrl: '/views/programs',
                controller: 'ProgramsCtrl'
            });
            $routeProvider.when('/programs/:slug', {
                templateUrl: '/views/program',
                controller: 'ProgramCtrl'
            });
            plangularConfigProvider.clientId = 'ddb5c1c24a58abe1a706af0425eda325';
        }])
        .controller('ProgramsCtrl', ['$scope', '$location', 'Programs',
            function($scope, $location, Programs) {

            Programs.programs().$promise.then(function(programs){
                $scope.programs = programs;
            });

            $scope.go = function ( path ) {
                $location.path( path )
            };
        }])
        .controller('ProgramCtrl', ['$scope', '$routeParams', 'Programs',function($scope, $routeParams, Programs) {
            Programs.program($routeParams).$promise.then(function(program){
                $scope.program = program;
            });
        }]);
});