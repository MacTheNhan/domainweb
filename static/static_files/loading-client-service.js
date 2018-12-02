"use strict";
serviceApp.factory('loadingPage', loadingPage)
    .directive('messageLoading', ['$timeout', function ($timeout) {
        return {
            restrict: 'C',
            link: function (scope, element, attr) {
                $timeout(function () {
                    var getWelm = element.width();
                    element.animate({'margin-left': 0 - (getWelm/2.5) + 'px'});
                }, 300);
            }
        }
    }])
    .value('loadingPageTemplate', 'loading-page.html')
    .run(["$templateCache", function (tpl) {
        tpl.put('loading-page.html', '<div class="loading-wrap"><div class="loading-style-default"><p class="message-loading" ng-show="message !== undefined">{{message}} <span class="three-dots">...</span></p><loading></loading></div></div>')
    }]);

loadingPage.$inject = ['$timeout', 'loadingPageTemplate', '$templateCache', '$rootScope', '$http', '$compile'];

function loadingPage($timeout, loadingPageTemplate, $templateCache, $rootScope, $http, $compile) {
    var r = 0,
        l = 0,
        u = 0,
        p = 0,
        f = [],
        ld = function(s, m) {
            typeof(s) !== "object" && (s = { data: s }),
                s.action !== undefined ? s.action : false,
                s.template = s.template ? s.template : loadingPageTemplate,
                s.type = m ? m : "",
                s.message !== undefined ? s.message : '',
                s.parentElm !== undefined ? s.parentElm : '',
                $http.get(s.template, {
                    cache: $templateCache
                }).success(function(e) {
                    var i = $rootScope.$new();

                    var rm = function () {
                        m.remove();
                    };

                    var m = $compile(e)(i);
                    i.message = s.message;
                    if(s.parentElm !== undefined) {
                        $timeout(function () {
                            var getParentElmCls = angular.element(document.getElementsByClassName(s.parentElm)),
                                getParentElmId = angular.element(document.getElementById(s.parentElm));
                            m.css({'position': 'absolute', 'opacity': .85, 'filter': 'alpha(opacity=85)'});
                            if(getParentElmCls.length > 0 || getParentElmId.length > 0) {
                                getParentElmCls.css('position', 'relative').append(m);
                                getParentElmId.css('position', 'relative').append(m);
                            }
                        }, 300);
                    }

                    if(s.data !== undefined) {
                        angular.element(document).find('.loading-wrap').remove();
                    }
                    else {
                        angular.element(document.getElementsByTagName("body")).append(m);
                    }
                    f.push(m);
                })
                .error(function(t) {
                    throw new Error("Template (" + s.template + ") could not be loaded. " + t)
                })
        };

    ld.fullscreen = function (dt) {
        this(dt, "fullscreen");
    };
    ld.inElement = function (dt) {
        this(dt, 'element');
    };

    return ld;
}