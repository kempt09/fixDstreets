var app = app || {};

app.factory('dbCollection', function () {
    'use strict';
    var lat = '',
        long = '';
    return {
        lat: lat,
        long: long
    };
});
