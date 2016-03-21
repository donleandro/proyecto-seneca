/**
 * Created by davidmesa on 3/16/16.
 */
define(["angular","angularResource"],
    function(angular) {
        angular.module("homeServices", ["ngResource"])
            .service("HomeInfo", ["$resource",function($resource){
                this.getInfo=$resource("/api/homeInfo",null,{run:{method:"GET",isArray:true}}).run;
            }])
    });