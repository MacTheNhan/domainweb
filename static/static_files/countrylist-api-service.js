"use strict";

serviceApp.factory('countrylistApi', countrylistApi);

countrylistApi.$inject = ['$q', '$http'];

function countrylistApi($q, $http) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    var promise = $http.get('/api/category/countrylist', JSON.stringify({}), {headers: header})
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