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
        angularResource: '../components/angular-resource/angular-resource.min',
        angularSanitize: '../components/angular-sanitize/angular-sanitize.min',
        text: '../components/requirejs-text/text',
        plangular: '../components/plangular/dist/plangular.min',
        socialShare: '../components/angular-socialshare/dist/angular-socialshare.min'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'bootstrap' : { "deps" :['jquery'] },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angularResource' : { "deps" : ['angular']},
        'angularSanitize' : { "deps" : ['angular']},
        'plangular' : { "deps" : ['angular']},
        'socialShare' : { "deps" : ['angular'] }
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