/**
 * Created by davidmesa on 2/4/16.
 */
require.config({
    paths: {
        angular: '../components/angular/angular',
        angularRoute: '../components/angular-route/angular-route',
        angularMocks: '../components/angular-mocks/angular-mocks',
        text: '../components/requirejs-text/text'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
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