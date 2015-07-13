angular.module('goodsServices', []).factory('goodsServ', ['$http', function($http) {
    return {
        get: function(callback) {
            $http.get('/goods?gid=38').success(function(data) {
                // prepare data here
                console.log(data);
                callback(data);
            });
        }
    };
}]);
