/**
 * Created by davidmesa on 2/29/16.
 */
define(["angular","angularResource"],
    function(angular) {
        angular.module("programServices", ["ngResource"])
            .service("Programs", ["$resource",function($resource){
                this.programs=$resource("/api/programs",null,{run:{method:"GET",isArray:true}}).run;
                this.program=$resource("/api/programs/:slug", {slug: "@slug"},{run:{method:"GET"}}).run;
            }])
    });