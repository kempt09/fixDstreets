var app = app || {};

app.factory('getTickets', function($http){
    'use strict';
    return $http.get('/api/find');
});

app.service('fileUpload', ['$http', function ($http) {
    'use strict';
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };
}]);