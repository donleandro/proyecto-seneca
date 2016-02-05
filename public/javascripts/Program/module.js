/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('radio.program', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/program/:program', {
                templateUrl: '/program',
                controller: 'ProgramCtrl'
            });
        }])
        .controller('ProgramCtrl', ['$scope', '$routeParams',function($scope, $routeParams) {
            $scope.test = "Ok Program "+$routeParams.program;
        }]);
});