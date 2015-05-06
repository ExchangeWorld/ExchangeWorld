/*ExwdApp.factory('seekServ', ['$http', function($http) { 
  return $http.get('/seekkk') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);

(function ()
{
	var seekServices = angular.module('seekServices', []);
  seekServices.service('seekServ', ['$http', function($http) { 
    return $http.get('/seekkk') 
              .success(function(data) { 
                return data; 
              }) 
              .error(function(err) { 
                return err; 
              }); 
  }]);

})();
*/

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