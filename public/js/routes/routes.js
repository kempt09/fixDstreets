var app = app || {};

app.config(function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/', {
            templateUrl: './views/index.html',
            controller: 'homeController'
        })
        .when('/feed', {
            templateUrl: './views/feed.html',
            controller: 'ticketFeed'
        })
        .when('/map', {
            templateUrl: './views/Map.html',
            controller: 'mapbox'
        })
        .when('/input', {
            templateUrl: './views/upload-picture.html',
            controller: 'uploadImg'
        })
        .when('/submit', {
            templateUrl: './views/submit.html',
            controller: 'submitTicket'
        })
        .otherwise({
            redirectTo: '/'
        });
});