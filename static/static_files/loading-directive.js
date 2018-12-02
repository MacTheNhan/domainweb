(function () {
    "use strict";
    directiveApp.directive('loading', loading);
    //Loading global
    loading.$inject = [];
    function loading() {
        return {
            restrict: 'AE',
            template: '<div class="cssload-loader">' +
            '<div class="cssload-inner cssload-one"></div>' +
            '<div class="cssload-inner cssload-two"></div>' +
            '<div class="cssload-inner cssload-three"></div>' +
            '</div>',
            replace: true,
            link: function (scope, element, attr) {

            }
        };
    }
})();