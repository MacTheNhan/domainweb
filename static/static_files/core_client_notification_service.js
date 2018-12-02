"use strict";
serviceApp.factory('icrmNotification', icrmNotification)
    .value("icrmNotificationTemplate", "icrm-notification.html")
    .run(["$templateCache", function(t) {
        t.put("icrm-notification.html", '<figure class="icrm-notification"><div class="icon-wrap"><i class="fa {{iclassName}}"></i></div><figcaption ng-class="{\'is-action\':action}"><h5 class="title" ng-show="title" ng-bind-html="title"></h5><p class="i-message" ng-bind-html="message"></p><div class="btn-group-actions" ng-show="action"><button type="button" class="btn mt-btn" ng-click="isClose()" ng-bind="action"></button></div></figcaption></figure>')
    }]);

icrmNotification.$inject = ["$timeout", "icrmNotificationTemplate", "$http", "$compile", "$templateCache", "$rootScope", "$sce"];

function icrmNotification($timeout, icrmNotificationTemplate, $http, $compile, $templateCache, $rootScope, $sce) {
    //Cài đặt vị trí hiển thị notification mặc định
    var last = {
        top: true,
        right: true,
        bottom: false,
        left: false
    };
    var r = 10,
        l = 10,
        u = 10,
        p = 10,
        d = 5e3,
        f = [],
        m = function(s, m) {
            typeof(s) !== "object" && (s = { message: s }),
            s.action !== undefined ? s.action : false,
            s.template = s.template ? s.template : icrmNotificationTemplate,
            s.delay = angular.isUndefined(s.delay) ? d : s.delay,
            s.type = m ? m : "",
            $http.get(s.template, {
                cache: $templateCache
            }).success(function(e) {
                var i = $rootScope.$new();

                //Thêm class icon vào các notification như primary, error, success, info, warning
                var clsMap = {
                    primary: 'fa-envelope-o',
                    error: 'fa-exclamation-circle',
                    success: 'fa-check',
                    info: 'fa-info',
                    warning: 'fa-exclamation-triangle'
                };
                for(var key in clsMap) {
                    if(key === s.type) {
                        i.iclassName = clsMap[key];
                    }
                }
                //End class icon
                if (
                    i.action = s.action,
                    i.message = $sce.trustAsHtml(s.message),
                    i.title = $sce.trustAsHtml(s.title),
                    i.t = s.type.substr(0, 1),
                    i.delay = s.delay,
                    typeof(s.scope) === "object")
                    {
                        for (var a in s.scope) {
                            i[a] = s.scope[a];
                        }
                    }

                var rm = function () {
                    m.addClass("killed");
                    m.remove();
                };

                var d = function() {
                        var df = ["top", "right", "left", "bottom"];
                        for(var k, t = 0, i = r, e = 0, $compile = f.length - 1; $compile >= 0 ; $compile--) {
                            var a = f[$compile],
                                o = parseInt(a[0].offsetHeight),
                                s = parseInt(a[0].offsetWidth);
                            c + o > window.innerHeight && (i = r, e++, t = 0);
                            var c = i + (0 === t ? 0 : u),
                                d = l + e * (p + s);
                            for(k in last) {
                                if(df.indexOf(k) !== -1 && last[k] !== false) {
                                    i = last[k];
                                    if(k == 'top' || k == 'bottom') {
                                        c + o > window.innerHeight && (i = last[k], e++, t = 0);
                                        a.css(k, c + 'px');
                                    }
                                    else if(k == 'right' || k == 'left') {
                                        a.css(k, d + 'px');
                                    }
                                }
                            }
                            i = c + o;
                            t++;
                        }
                    },
                    m = $compile(e)(i);
                if(s.type !== 'config') {
                    m.addClass(s.type);
                }
                i.isClose = function () {
                    $timeout(rm, s.delay);
                };
                m.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd click", function(t) {
                    ("click" === t.type || "opacity" === t.propertyName && t.elapsedTime >= 1) && (m.remove(), f.splice(f.indexOf(m), 1), d())
                });
                if(s.action == undefined) {
                    $timeout(rm, s.delay);
                }
                angular.element(document.getElementsByTagName("body")).append(m);
                f.push(m);
                $timeout(d);
            })
            .error(function(t) {
                throw new Error("Template (" + s.template + ") could not be loaded. " + t)
            })
        };
    m.config = function (t) {
        if(typeof t == "object") {
            var current;
            for(var k in t) {
                if(typeof t[k] == 'number') {
                    t[k] = true;
                    current = t;
                }
            }

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({}, current);
        }
        else {
            this.primary({message: 'Bạn cần cài đặt icrmNotification.config dưới dạng dữ liệu JSON, với các key: top, right, bottom , left', action: 'Ok'});
        }
    };
    m.primary = function (t) {
        this(t, "primary");
    };
    m.error = function (t) {
        this(t, "error");
    };
    m.success = function (t) {
        this(t, "success");
    };
    m.info = function (t) {
        this(t, "info");
    };
    m.warning = function (t) {
        this(t, "warning");
    };
    return m;
}