angular.module('seekServices', [])
  .factory('seekServ', ['$http', function($http){
    return{
      get: function(callback){
          $http.get('/seekkk').success(function(data) {
          // prepare data here
          callback(data);
        });
      }
    };
  }]);