angular.module('seekServices', []).factory('seekServ', ['$http', function($http) {
	return {
		get: function(callback) {
			/**
			 *  here should get search condition
			 *
			 */

			$http.get('/seek?title=').success(function(data) {
				// prepare data here
				callback(data);
			});
		}
	};
}]);
