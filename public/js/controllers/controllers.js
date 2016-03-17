var app = app || {};

app.controller('submitIssue', ['$scope', function($scope){
    'use strict';

}]);

app.controller('mapbox', [function(){
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
        document.getElementById('info').innerHTML = e.lngLat;
    });
}]);

/*dragable marker. 
<head>
<meta charset=utf-8 />
<title>Draggable marker</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.css' rel='stylesheet' />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
<div id='map'></div>

<script>
L.mapbox.accessToken = 'pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([42.32883494037918, -83.03841204223656],4);

var marker = L.marker(new L.LatLng(42.32883494037918, -83.03841204223656), {
    icon: L.mapbox.marker.icon({
        'marker-color': 'ff8888'
    }),
    draggable: true
});

marker.bindPopup('This marker is draggable! Move it around.');
marker.addTo(map);
</script>*/

