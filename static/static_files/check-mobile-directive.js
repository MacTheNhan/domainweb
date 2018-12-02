(function () {
    "use strict";
    directiveApp.directive('addClassToPage', addClassToPage);

    addClassToPage.$inject = ['$window', '$rootScope'];
    
    function addClassToPage($window) {
        return {
            restrict: 'AE',
            scope: {
                addClassName: '@'
            },
            link: function (scope, element, attr) {
                var getClassName = scope.addClassName;
                var w = angular.element($window);
                scope.getWindowDimensions = function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                };
                scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                    if(newValue.w < 768) {
                        checkClassName ? element.addClass(getClassName) : 'Class phải là chuỗi ký tự và ký tự đầu không phải số';
                        if(checkTable()) {
                            $('.table').wrap('<div class="table-responsive"></div>');
                        }
                    }
                    else {
                        element.removeClass(getClassName);
                        if(unWrapTable()) {
                            $('.table').unwrap('.table-responsive');
                        }
                    }
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });

                function checkClassName() {
                    if(typeof getClassName == 'string') {
                        return true;
                    }
                }

                function checkTable() {
                    var getTable = angular.element('body').find('table');
                    if(getTable.length > 0) {
                        return true;
                    }
                }
                function unWrapTable() {
                    if($('.table-responsive').length > 0) {
                        return true;
                    }
                }
            }
        }
    }
    
})();