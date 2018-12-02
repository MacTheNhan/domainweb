(function () {
	//Service lay du lieu ve quoc gia
	angular.module('synModuleCountryService', [])
	.factory('synCountryService', function ($http) {
	    return {
	        list: function (callback) {
	            $http.get('/data/cache/country_list.json').success(callback);
	        }
	    };
	});
})();