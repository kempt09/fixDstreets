var app = app || {};

app.config(function($routeProvider){
    'use strict';
    $routeProvider
        .when('/', {
            templateUrl: './views/index.html'
        })
        .when('/issue', {
        templateUrl: './views/submit-issue.html',
        controller: 'submitIssue'
    });
});