var app = app || {};

app.controller('homeController',['$scope', '$http', 'dbCollection', function($scope, $http, dbCollection){
    'use strict';
    $scope.auth = function(googleUser){
		 dbCollection.profile = googleUser.getBasicProfile();
		  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		  console.log('Name: ' + profile.getName());
		  console.log('Image URL: ' + profile.getImageUrl());
		  console.log('Email: ' + profile.getEmail());
		}
	
}]);

