//Module service get data JSON api (dung lai cua Mr.Do)
(function () {
	"use strict";
	angular.module("whoisModuleService", [])
		.factory("whoisService", ['$http','$q', function ($http, $q) {
			return {
				//Ham lay ra ten mien chinh xac
				domainsSpecify: function(query){
					var deferred = $q.defer();

					if (typeof (query) == "undefined") {
						query = "";
					}
					var cancel = function(reason){
						deferred.resolve(reason);
					};

					var promise = $http({ method: 'GET', url: '/api/order/whois/domainspecify/' + query})
						.success(function(data) {
							deferred.resolve(data);
						})
						.error(function(status) {
							deferred.reject(status);
						});

					return{
						promise:promise,
						cancel: cancel
					};
				},
				//lấy ra danh sách chiến dịch combo(fix cứng)
				domainsCombo: function(query){
					var deferred = $q.defer();

					if (typeof (query) === "undefined") {
						query = "";
					}
					var cancel = function(reason){
						deferred.resolve(reason);
					};

					var promise = $http({method: 'GET', url: '/api/order/whois/domainscombo/' + query, timeout:deferred.promise})
						.success(function(data){
							deferred.resolve(data);
						})
						.error(function(status) {
							deferred.reject(status);
						});
					return {
						promise:promise,
						cancel: cancel
					};
				},
				//Lấy ra danh sách đuôi tên miền hỗ trợ
				getSuffix: function(){
					var deferred = $q.defer();

					var cancel = function(reason){
						deferred.resolve(reason);
					};

					var promise = $http({method: 'GET', url: '/api/order/whois/getsuffix', timeout:deferred.promise})
						.success(function(data){
							deferred.resolve(data);
						})
						.error(function(status){
							deferred.reject(status);
						});

					return {
						promise: promise,
						cancel: cancel
					};
				},
				getSuffixVNNIC: function(){
					var deferred = $q.defer();

					var cancel = function(reason){
						deferred.resolve(reason);
					};

					var promise = $http({method: 'GET', url: '/api/domain/listsuffix', timeout:deferred.promise})
						.success(function(data){
							deferred.resolve(data);
						})
						.error(function(status){
							deferred.reject(status);
						});

					return {
						promise: promise,
						cancel: cancel
					};
				},
				//check tồn tại của tên miền để đưa vào giỏ hàng
				checkAvailable: function(query){
					var deferred = $q.defer();

					if(typeof(query) === "undefined") {
						query = "";
					}

					var cancel = function(reason){
						deferred.resolve(reason);
					};

					var promise = $http({method: 'GET', url: '/api/order/checkavailable/' + query, timeout:deferred.promise})
						.success(function(data){
							deferred.resolve(data);
						})
						.error(function(status){
							deferred.reject(status);
						});

					return {
						promise: promise,
						cancel: cancel
					};
				},
				//Lấy ra tên miền gợi ý
				domainssuggestion: function() {
					var deferred = $q.defer();
					var urlnodeapi = "/api/order/whois/domainssuggestion/";
					var headers = {
						'Content-Type': 'application/json; charset=utf-8'
					};

					var getDomainSugges = function(queryname) {
						return($http({method: 'post', url: urlnodeapi + queryname, headers: headers})
							.success(handlerSuccess)
							.error(handlerError));
					};

					function handlerSuccess(data) {
						return deferred.resolve(data);
					};

					function handlerError(status) {
						return deferred.reject(status);
					};

					return({
						getDomainSugges: getDomainSugges
					});
				}
			};
		}]);
})();

