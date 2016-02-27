/**
 * Created by davidmesa on 2/4/16.
 */
require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery.min',
        bootstrap: '../dist/js/bootstrap.min',
        angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        angularMocks: '../components/angular-mocks/angular-mocks',
        text: '../components/requirejs-text/text',
        plangular: '../components/plangular/dist/plangular.min'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'bootstrap' : { "deps" :['jquery'] },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    priority: [
        "angular"
    ]
});

require([
        'angular',
        'app'
    ], function(angular, app) {
        angular.element().ready(function() {
            // bootstrap the app manually
            angular.bootstrap(document, ['radio']);
        });
    }
);