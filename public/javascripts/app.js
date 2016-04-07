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
    config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.when('/aboutUs', {
            templateUrl: '/views/aboutUs'
        });

        $routeProvider.otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true).hashPrefix("!");
    }]).
    controller('MainCtrl', ['$scope', '$location', function($scope, $location){
        $scope.MetaTitle = "Proyecto Seneca";
        $scope.MetaDescription = "Proyecto Séneca nace con el ánimo de suplir la necesidad de emisión de la Universidad de los Andes, generando contenido entre la comunidad y el país.";
        $scope.go = function ( path ) {
            $location.path( path )
        };
    }]).
    controller('HeaderCtrl', ['$scope','$window', '$location', function($scope,$window, $location){

        $scope.listenClick = function () {
            var height=499;
            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
            if(isSafari) height = height + 47;
            $window.open('/streaming', 'PSPlayer', 'height='+height+',width=320');
        };
    }]).
    controller('FooterCtrl', ['$scope', function($scope){
        $scope.mailingListToggle = false;
        $scope.mailingList = function(){
            $scope.mailingListToggle = !$scope.mailingListToggle;
        }
    }]);
});