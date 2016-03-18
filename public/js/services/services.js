var app = app || {};

app.factory('getTickets', function($http){
    'use strict';
    return $http.get('/api/find');
});
