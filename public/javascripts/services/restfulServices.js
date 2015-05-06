(function () {

    var restful = angular.module('restfulServices', ['ngResource']);
    
    restful.factory('Goods', ['$resource', function ($resource) {
        return $resource('/goods/:gid', null, {
            
        });
    }]);

})();