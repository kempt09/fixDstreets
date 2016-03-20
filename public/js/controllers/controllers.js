var app = app || {};

app.controller('submitTicket', ['$scope', '$http', 'dbCollection', function ($scope, $http, dbCollection) {
    'use strict';
    $scope.data = {};
    $scope.data.lat = dbCollection.lat;
    $scope.data.long = dbCollection.long;
    $scope.data.address = '';
    $scope.data.convert = dbCollection.convert(dbCollection.long, dbCollection.lat).then(function (res) {
        console.log(res.data.features[0].place_name);
        $scope.data.address = res.data.features[0].place_name;
        $scope.sendData = function () {
            console.log('send');
            $http.post('/api/submit', $scope.data)
                .success(function (data) {
                    $scope.data = '';
                    $scope.info = data;
                })
                .error(function (data) {
                    console.log('error' + data);
                });
        };
    });

}]);

app.controller('ticketFeed', ['$scope', 'getTickets', function ($scope, getTickets) {
    'use strict';
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
        var markerLocation = [];
        $scope.generateMarkerPoints = function () {
            var latitude,
                longitude,
                i;
            for (i = 0; i < $scope.collection.data.length; i++) {
                $scope.collection.data[i].index = i + 1;
                var description = $scope.collection.data[i].description;
                latitude = $scope.collection.data[i].lat;
                longitude = $scope.collection.data[i].long;
                markerLocation.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "properties": {
                        "description": description,
                        "title": i + 1,
                        "marker-symbol": "circle"
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
                        "text-anchor": "top",
                        "icon-allow-overlap": true
                    }
                });
            });
        };
        $scope.generateMarkerPoints();
    });
}]);





