"use strict";

directiveApp.directive('iTooltip', iTooltip);

iTooltip.$inject = ['$timeout'];

function iTooltip($timeout) {
    return {
        restrict: 'AE',
        link: function (scope, elm, attr) {
            var getWowlItem = elm.closest(".owl-item");
            elm.css({
               width: $(getWowlItem).outerWidth() + 'px'
            });
        }
    }
}