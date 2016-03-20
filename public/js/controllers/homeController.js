var app = app || {};

app.controller('homeController',['$scope', '$http', function($scope, $http){
    'use strict';
    $scope.auth = function(){
        return $http.get('/auth/login');
    };
}]);

