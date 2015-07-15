angular.module('goodsServices', []).factory('goodsServ', ['$http', function($http) {
    return {
        get: function(callback, id) {
            $http.get('/goods?gid=' + id).success(function(data) {
                // prepare data here
                console.log(data);
                callback(data);
            });
        }
    };
}]);
