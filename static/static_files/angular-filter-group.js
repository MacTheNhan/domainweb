(function () {
    "use strict";
    angular.module("filter.global", [])
        .filter('currency', function () {
            return function (input) {
                if(input == undefined)
                    return null;
                return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' \u20ab';
            };
        })
        .filter('split', function() {
            return function(input, splitChar, splitIndex) {
                // do some bounds checking here to ensure it has that index
                return input.split(splitChar)[splitIndex];
            };
        })
        .filter('trustAsResourceUrl', trustAsResourceUrl);

    trustAsResourceUrl.$inject = ['$sce'];

    function trustAsResourceUrl($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }
})();