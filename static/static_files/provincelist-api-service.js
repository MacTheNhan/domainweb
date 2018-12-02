"use strict";

serviceApp.factory('provincelistApi', provincelistApi);

provincelistApi.$inject = ['$q', '$http'];

function provincelistApi($q, $http) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    var promise = $http.get('/api/category/provincelist', JSON.stringify({}), {headers: header})
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