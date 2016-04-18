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
        .controller('HomeCtrl', ['$scope', 'HomeInfo', '$mixpanel',
            function($scope, HomeInfo, $mixpanel) {

                //Mixpanel
                $mixpanel.track('Open Home');

                var selectedIndex = 0;
                
                HomeInfo.getInfo().$promise.then(function(homeInfo){
                    $scope.homeInfo = homeInfo;
                    $scope.selected = homeInfo[0];
                });

                $scope.colNumber = function (max) {
                    if(max < $scope.homeInfo.length){
                        return 12/ max;
                    }
                    else {
                        return 12/ $scope.homeInfo.length
                    }
                }

                $scope.selectProgram = function (index) {
                    if(index != selectedIndex){
                        $('#home-program-'+selectedIndex).removeClass('selected');
                        $('#home-program-'+index).addClass('selected');
                        $scope.selected = $scope.homeInfo[index];
                        selectedIndex = index;

                        //Mixpanel
                        $mixpanel.track('Select-' + $scope.selected.name + '-Home');
                    }
                }

                $scope.goToProgram = function () {

                    //Mixpanel
                    $mixpanel.track('GoTo-' + $scope.selected.name + '-Home');

                    $scope.go('/programs/'+$scope.selected.slug)
                }
            }
        ]);
});