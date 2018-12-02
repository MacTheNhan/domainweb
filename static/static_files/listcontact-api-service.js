"use strict";

serviceApp.factory('listcontactApi', listcontactApi);

listcontactApi.$inject = ['$q', '$http'];

function listcontactApi($q, $http) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    var promise = $http.post('/api/account/listcontact', JSON.stringify({}), {headers: header})
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