(function () {
    "use strict";
    serviceApp.factory('resourceManagerApi', resourceManagerApi);

    resourceManagerApi.$inject = ['$q', '$http'];

    function resourceManagerApi($q, $http) {
        var deferred = $q.defer();
        var header = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return {
            resourcesList: function (data) {
                var promise = $http.post('/api/resourcegrant/list', JSON.stringify(data), {headers: header})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(status){
                        deferred.reject(status);
                    });
                return {
                    promise: promise
                };
            },
            resourcesDetail: function (data) {
                var promise = $http.post('/api/resourcegrant/detail', JSON.stringify(data), {headers: header})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(status){
                        deferred.reject(status);
                    });
                return {
                    promise: promise
                };
            },
            resourcesRights: function (data) {
                var promise = $http.post('/api/resourcegrant/getrights', JSON.stringify(data), {headers: header})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(status){
                        deferred.reject(status);
                    });
                return {
                    promise: promise
                };
            }
        }
    }

})();