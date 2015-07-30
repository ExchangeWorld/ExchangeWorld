angular.module('profileServices', []).factory('profileServ', ['$http', function($http) {
    return {
        get: function(callback, id) {
            $http.get('/profile?fb_id=' + id).success(function(data) {
                // prepare data here
				console.log(data);
                callback(data);
            });
        }
    };
}]);
