"use strict";

serviceApp.factory('inetRecruitment', inetRecruitment);

inetRecruitment.$inject = ['$http', '$q'];

function inetRecruitment($http, $q) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    return {
        listall: function (category) {
            var params = {
                category: category
            };
            var promise = $http.post('/api/recruitment/search', JSON.stringify(params), {headers: header})
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
        listcategory: function () {
            var promise = $http.post('/api/recruitmentcategory/search', JSON.stringify({}), {headers: header})
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