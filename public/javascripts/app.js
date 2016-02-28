/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';

define([
    'angular', 'jquery', 'bootstrap',
    'angularRoute', 'socialShare',
    'Home/module', 'Program/module'
], function(angular, $) {
    return angular.module('radio', [
        'ngRoute', '720kb.socialshare',
        'radio.home', 'radio.program'
    ]).
    config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/aboutUs', {
            templateUrl: '/aboutUs'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]).
    controller('HeaderCtrl', ['$scope','$window', '$location', function($scope,$window, $location){

        $scope.listenClick = function () {
            var height=499;
            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
            if(isSafari) height = height + 47;
            $window.open('/streaming', 'PSPlayer', 'height='+height+',width=320');
        };
        
        $scope.go = function ( path ) {
            $location.path( path )
        };
    }]).
    controller('FooterCtrl', ['$scope', function($scope){
        $scope.mailingListToggle = false;
        $scope.mailingList = function(){
            $scope.mailingListToggle = !$scope.mailingListToggle;
        }
    }]);
});