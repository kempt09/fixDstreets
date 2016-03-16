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
                console.log(data);
            })
            .error(function (data) {
                console.log('error' + data);
            });
    };
}]);








