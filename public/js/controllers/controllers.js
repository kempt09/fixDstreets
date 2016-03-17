var app = app || {};

app.controller('submitTicket', ['$scope', '$http', 'dbCollection', function ($scope, $http, dbCollection) {
    'use strict';
    $scope.data = {};
    $scope.data.lat = dbCollection.lat;
    $scope.data.long = dbCollection.long;
    $scope.sendData = function () {
        $http.post('/api/submit', $scope.data)
            .success(function (data) {
                $scope.data = '';
                $scope.info = data;
            })
            .error(function (data) {
                console.log('error' + data);
            });
    };
}]);

app.controller('ticketFeed', ['$scope', 'getTickets', '$http', function ($scope, getTickets, $http) {
    'use strict';
    $scope.collection = '';
    $scope.address = [];
    $scope.convert = function (x, y) {
        $http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + x + ',' + y + '.json?access_token=pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg').success(function (data) {
            $scope.address.push(data.features[0].place_name);
            $scope.collection.data;
        });
    };
    getTickets.then(function(response){
        $scope.collection = response;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZml4ZHN0cmVldHMiLCJhIjoiY2lsczNxMHYxMDhzNXZmbHlmbWdkM2psaiJ9.0HF3gwCxpsc_s2d8HxvXwg';
        var bounds = [
            [-83.03841204223656, 42.32883494037918],
            [-83.06291670379659, 42.344030329635274]
        ];
        var map = new mapboxgl.Map({
            container: 'mapView', // container id
            style: 'mapbox://styles/fixdstreets/cilse2gcq009va2kqe2eqzzgo', //stylesheet location
            center: [-83.0506, 42.3361], // starting position
            zoom: 14, // starting zoom
            interactive: true,
            maxBounds: bounds
        });
        $scope.collection.data.forEach(function(item) {
            $scope.convert(item.long, item.lat);
        });
        var markerLocation = [];
        $scope.generateMarkerPoints = function () {
            var i,
                latitude,
                longitude;
            for (i = 0; i < $scope.collection.data.length; i++) {
                $scope.collection.data[i].index = i + 1;
                latitude = $scope.collection.data[i].lat;
                longitude = $scope.collection.data[i].long;
                markerLocation.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "title": i,
                        "marker-symbol": "marker"
                    }
                });
            }
            return $scope.loadMap();
        };
        $scope.loadMap = function () {
            map.on('style.load', function () {
                map.addSource("markers", {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": markerLocation
                    }
                });
                map.addLayer({
                    "id": "markers",
                    "type": "symbol",
                    "source": "markers",
                    "layout": {
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"] ,
                        "icon-image": "{marker-symbol}-15",
                        "text-offset": [0, -1.5],
                        "text-anchor": "top"
                    }
                });
            });
        };
        $scope.generateMarkerPoints();
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




