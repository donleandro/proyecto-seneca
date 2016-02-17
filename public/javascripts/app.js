/**
 * Created by davidmesa on 2/4/16.
 */
'use strict';

define([
    'angular',
    'jquery',
    'bootstrap',
    'angularRoute',
    'Home/module',
    'Program/module'
], function(angular, $) {
    return angular.module('radio', [
        'ngRoute',
        'radio.home',
        'radio.program'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]).
    controller('HeaderCtrl', ['$scope','$window', function($scope,$window){
        $scope.test = "Esto es un header con angular";

        
        $scope.listenClick = function () {
            var height=499;
            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
            if(isSafari) height = height + 47;
            $window.open('/streaming', 'PSPlayer', 'height='+height+',width=320');
        }
    }]).
    controller('FooterCtrl', ['$scope', function($scope){
        $scope.test = "Esto es un footer con angular"
    }]);
});