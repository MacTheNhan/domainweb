(function(){
	'use strict';
	
	angular.module('synModuleProvinceService', [])
	.factory('synProvinceService', function($http){
	   return {
	       list: function(callback){
	           $http.get('/data/cache/province_list.json').success(callback);
	       }
	   } 
	});
})();