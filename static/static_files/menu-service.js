"use strict";

serviceApp.factory('menuService', menuService);

menuService.$inject = ['$http', '$q'];

function menuService($http, $q) {
    return {
        mainMenu: function(){
            var deferred = $q.defer();

            var promise = $http.get('/api/mobile/main-menu')
                .success(function(response){
                    deferred.resolve(response.data);
                });

            return {
                promise: promise
            }
        },
        footerMenu: function(m){
            var deferred = $q.defer();

            var promise = $http({ method: 'GET', url: '/api/mobile/footer-menu', timeout:deferred.promise})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(status) {
                    deferred.reject(status);
                });
            return{
                promise:promise
            };
        },
        sidebarLeftMenu: function(){
            var deferred = $q.defer();

            var promise = $http({ method: 'GET', url: '/api/sidebar-left-menu', timeout:deferred.promise})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(status) {
                    deferred.reject(status);
                });

            return{
                promise:promise
            };
        },
        controlMenu: function(){
            var deferred = $q.defer();

            var promise = $http({ method: 'GET', url: '/api/mobile/control-menu', timeout:deferred.promise})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(status) {
                    deferred.reject(status);
                });

            return{
                promise:promise
            };
        }
    }
}
