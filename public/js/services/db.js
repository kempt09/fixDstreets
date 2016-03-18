var app = app || {};

app.factory('dbCollection', function ($http) {
    'use strict';
    var lat = '',
        long = '';
    function convert(x,y) {
        return $http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + x + ',' + y + '.json?access_token=pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg');
    }
    return {
        lat: lat,
        long: long,
        convert: convert
    };
});
