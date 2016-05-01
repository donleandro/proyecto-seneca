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
        .controller('ProgramsCtrl', ['$scope', '$location', 'Programs', '$mixpanel',
            function($scope, $location, Programs, $mixpanel) {

                $scope.$emit("MetaTitle", "Programas - Proyecto Séneca");

                //Mixpanel
                $mixpanel.track('Open Programs');


                Programs.programs().$promise.then(function(programs){
                    $scope.programs = programs;
                });

                $scope.hoverProgram = function (slug) {
                    $('#slogan-'+slug).removeClass('transparent');
                    $('#img-'+slug).addClass('dark')
                };

                $scope.leaveProgram = function (slug) {
                    $('#slogan-'+slug).addClass('transparent');
                    $('#img-'+slug).removeClass('dark')
                };

                $scope.goToProgram = function (program) {

                    //Mixpanel
                    $mixpanel.track('GoTo-' + program.name + '-Programs');

                    $scope.go('/programs/'+program.slug);
                }

            }])
        .controller('ProgramCtrl', ['$scope', '$routeParams', 'Programs', '$mixpanel',
            function($scope, $routeParams, Programs, $mixpanel) {

                Programs.program($routeParams).$promise.then(function(program){

                    //Mixpanel
                    $mixpanel.track('Open Program-' + program.name);

                    $scope.program = program;

                    $scope.$emit("MetaTitle", program.name + " - Proyecto Séneca");

                });
                
                $scope.registerPlay = function (episode) {
                    
                    //Mixpanel
                    $mixpanel.track('PlayPause-' + episode.title);
                    
                }
                
            }]);
});