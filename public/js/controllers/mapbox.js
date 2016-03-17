var app = app || {};

app.controller('mapbox', ['$scope', 'dbCollection', function ($scope, dbCollection) {
    'use strict';
    mapboxgl.accessToken = 'pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg';
    var bounds = [
        [-83.03841204223656, 42.32883494037918],
        [-83.06291670379659, 42.344030329635274]
    ];
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/fixdstreets/cilse2gcq009va2kqe2eqzzgo', //stylesheet location
        center: [-83.0506, 42.3361], // starting position
        zoom: 14, // starting zoom
        interactive: true,
        maxBounds: bounds
    });
    map.on('click', function (e) {
        dbCollection.lat = e.lngLat.lat;
        dbCollection.long = e.lngLat.lng;
    });
}]);