"use strict";

serviceApp.factory('listdnsApi', listdnsApi);

listdnsApi.$inject = ['$q', '$http'];

function listdnsApi($q, $http) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    var promise = $http.post('/api/account/listdns', JSON.stringify({}), {headers: header})
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