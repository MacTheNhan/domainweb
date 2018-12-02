(function () {
    "use strict";

    serviceApp.factory('compareDevice', compareDevice);

    compareDevice.$inject = ['$window'];

    function compareDevice($window) {
        return {
            checkScreen: function () {
                return {
                    'h': $window.window.outerHeight,
                    'w': $window.window.outerWidth
                };
            }
        };
    }
})();