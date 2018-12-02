(function () {
    "use strict";
    
    directiveApp.directive('radioInline', radioInline);

    radioInline.$inject = [];
    
    function radioInline() {
        return {
            restrict: 'C',
            link: radioBootstrap
        }
    }

    directiveApp.directive('radio', radio);

    radio.$inject = [];

    function radio() {
        return {
            restrict: 'C',
            link: radioBootstrap
        }
    }

    function radioBootstrap(scope, element, attr) {
        var getIconOutline = angular.element(element).find('.ion-ios-circle-outline'),
            getIconCircleFill = angular.element(element).find('.ion-ios-circle-filled'),
            getInputRadio = angular.element(element).find('input[type=radio]');
        if(getIconCircleFill.length == 0 && getIconOutline.length == 0 && getInputRadio.length > 0) {
            getInputRadio.after('<i class="ion-ios-circle-filled"></i><i class="ion-ios-circle-outline"></i>')
        }
    }
    
})();