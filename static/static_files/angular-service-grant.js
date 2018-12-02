(function () {
    "use strict";

    angular.module('grantApp', [])
        .factory('grantService', fn_grantService);

        fn_grantService.inject = ['$http', '$rootScope'];

        function fn_grantService ($http, $rootScope){
            var grantData = [];
            return {
                getRight: function() {
                    return $http.get('/api/grantaccess/getright').then(function (response) {
                            grantData = response.data;
                            $rootScope.$broadcast('handShareGrantData', grantData);
                            return grantData;
                        });
                },
                grantAccess: function($dataParams) {
                    return $http({
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        url: '/api/grantaccess/listall',
                        method: 'POST',
                        data: $dataParams
                    }).success(function(addData){
                        grantData = addData;
                        $rootScope.$broadcast('handShareGrantData', grantData);
                    });
                }
            }
        };
})();