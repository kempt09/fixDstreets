var app = app || {};

app.factory('getTickets', function($http){
	return $http.get('/api/find');
});