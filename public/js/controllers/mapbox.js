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

//draggable marker

    <head>
    <meta charset='utf-8' />
    <title></title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.15.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.15.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>

<style>
.coordinates {
    background: rgba(0,0,0,0.5);
    color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding:5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
}
</style>

<div id='map'></div>
<pre id='coordinates' class='coordinates'></pre>

<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg';
// Holds mousedown state for events. if this
// flag is active, we move the point on `mousemove`.
var isDragging;

// Is the cursor over a point? if this
// flag is active, we listen for a mousedown event.
var isCursorOverPoint;

var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-83.0458, 42.3314],
    zoom: 15
});

var canvas = map.getCanvasContainer();

var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-83.0458, 42.3314]
        }
    }]
};

function mouseDown(e) {
    if (!isCursorOverPoint) return;

    isDragging = true;

    // Set a cursor indicator
    canvas.style.cursor = 'grab';

    // Mouse events
    map.on('mousemove', onMove);
    map.on('mouseup', onUp);
}

function onMove(e) {
    if (!isDragging) return;
    var coords = e.lngLat;

    // Set a UI indicator for dragging.
    canvas.style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
    map.getSource('point').setData(geojson);
}

function onUp(e) {
    if (!isDragging) return;
    var coords = e.lngLat;

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    canvas.style.cursor = '';
    isDragging = false;
}

map.on('load', function() {

    // Add a single point to the map
    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });

    map.addLayer({
        "id": "point",
        "interactive": true,
        "type": "circle",
        "source": "point",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#3887be"
        }
    });

    // If a feature is found on map movement,
    // set a flag to permit a mousedown events.
    map.on('mousemove', function(e) {
        map.featuresAt(e.point, {
            radius: 10,
            includeGeometry: true,
            layer: 'point'
        }, function(err, features) {
            // Change point and cursor style as a UI indicator
            // and set a flag to enable other mouse events.
            if (!err && features.length) {
                map.setPaintProperty ('point', 'circle-color', '#3bb2d0');
                canvas.style.cursor = 'move';
                isCursorOverPoint = true;
                map.dragPan.disable();
            } else {
                map.setPaintProperty ('point', 'circle-color', '#3887be');
                canvas.style.cursor = '';
                isCursorOverPoint = false;
                map.dragPan.enable();
            }
        });
    });

    // Set `true` to dispatch the event before other functions call it. This
    // is necessary for disabling the default map dragging behaviour.
    map.on('mousedown', mouseDown, true);
});
</script>

</body>
</html>
}]);