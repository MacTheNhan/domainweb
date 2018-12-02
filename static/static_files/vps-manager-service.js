"use strict";

serviceApp.factory('vpsManagerApi', vpsManagerApi);

vpsManagerApi.$inject = ['$q', '$http'];

function vpsManagerApi($q, $http) {
    var deferred = $q.defer();
    var header = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    return {
        vpsInfo: function (data) {
            var promise = $http.post('/api/vps/info', JSON.stringify(data), {headers: header})
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
        serverInfo: function (data) {
            var promise = $http.post('/api/vps/infoserver', JSON.stringify(data), {headers: header})
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
        deleteServer: function (data) {
            var promise = $http.post('/api/vps/deleteserver', JSON.stringify(data), {headers: header})
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
        createServer: function (data) {
            var promise = $http.post('/api/vps/createserver', JSON.stringify(data), {headers: header})
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
        createVolumes: function (data) {
            var promise = $http.post('/api/vps/createvolume', JSON.stringify(data), {headers: header})
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
        deleteVolumes: function (data) {
            var promise = $http.post('/api/vps/deletevolume', JSON.stringify(data), {headers: header})
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
        createSnapShot: function (data) {
            var promise = $http.post('/api/vps/createsnapshot', JSON.stringify(data), {headers: header})
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
        deleteSnapshot: function (data) {
            var promise = $http.post('/api/vps/deletesnapshot', JSON.stringify(data), {headers: header})
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
        listVolumeSnapShot: function (data) {
            var promise = $http.post('/api/vps/listvolumesnapshot', JSON.stringify(data), {headers: header})
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
        updateAutoSnapshot: function (data) {
            var promise = $http.post('/api/vps/updateautosnapshot', JSON.stringify(data), {headers: header})
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
        consoleUrl: function (data) {
            var promise = $http.post('/api/vps/getconsole', JSON.stringify(data), {headers: header})
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
        keyPair: function (data) {
            var promise = $http.post('/api/vps/keypair', JSON.stringify(data), {headers: header})
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
        getPrivateKey: function (data) {
            var promise = $http.post('/api/vps/getprivatekey', JSON.stringify(data), {headers: header})
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
        shutdownCloudServer: function (data) {
            var promise = $http.post('/api/vps/shutoff', JSON.stringify(data), {headers: header})
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
        startCloudServer: function (data) {
            var promise = $http.post('/api/vps/start', JSON.stringify(data), {headers: header})
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
        sorfReBootCloudServer: function (data) {
            var promise = $http.post('/api/vps/rebootsoft', JSON.stringify(data), {headers: header})
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
        hardReBootCloudServer: function (data) {
            var promise = $http.post('/api/vps/reboothard', JSON.stringify(data), {headers: header})
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
        getListImageCloudServer: function (data) {
            var promise = $http.post('/api/vps/listimage', JSON.stringify(data), {headers: header})
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
        getUrlGrafana: function (data) {
            var promise = $http.post('/api/vps/geturlgrafana', JSON.stringify(data), {headers: header})
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
        attachIPpublic: function (data) {
            var promise = $http.post('/api/vps/attachippublic', JSON.stringify(data), {headers: header})
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
        detachIPpublic: function (data) {
            var promise = $http.post('/api/vps/detachippublic', JSON.stringify(data), {headers: header})
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
    }
}