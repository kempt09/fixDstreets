var app = app || {};

app.controller('submitIssue', ['$scope', '$http', function($scope, $http){
    'use strict';
    $scope.lat = '';
    $scope.long = '';
    $scope.description = '';
    $scope.image = '';
    $scope.postTicket = $http({
        method: 'POST',
        url: '/api/submit',
        data: {
            lat: $scope.lat,
            long: $scope.long,
            description: $scope.description,
            image: $scope.image
        }
    });
}]);




