"use strict";

directiveApp.directive('toastUi', toastUi);

toastUi.$inject = ["$sce", "$cookies", "$http"];

function toastUi($sce, $cookies, $http) {
    var db;
    var request = window.indexedDB.open("InetSubscription", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        // console.log("success: "+ db);
        var db = event.target.result;
        var transaction = db.transaction(["account"], "readwrite");
        var store = transaction.objectStore("account");
        var accountStore = store.get('account');

        accountStore.onsuccess = function(event) {
            // Do something with the request.result!
            if(accountStore.result) {
                if(accountStore.result.createdDate){
                    store.put({id: 'account', sid: $cookies.get('sid'), createdDate: accountStore.result.createdDate});
                } else {
                    store.put({id: 'account', sid: $cookies.get('sid'), createdDate: new Date().getTime()});
                }
            } else {
                // alert("error");
            }
        };
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("account", {keyPath: "id"});
        objectStore.put({id: 'account', sid: $cookies.get('sid'), createdDate: new Date().getTime()});
    };

    if(Notification.permission != 'default'){
        return {
        };
    }
    if($cookies.get('desktopNotification') == 'denied'){
        return {
        };
    }
    return {
        restrict: "E",
        template: "<div class='toast-wrap'><div class='toast-inner'><div class='toast-thumbn'><i class='fa fa-gift animated swing'></i></div><div class='toast-content'><div class='txt-sz-16px margin-tb-15px animated bounceInDown' ng-bind-html='txtTest'></div><div class='btn-group-action text-right'><button type='button' class='btn mt-btn bg-white' ng-click='toastAction(0)'>Không</button><button ng-click='toastAction(1)' class='btn mt-btn bg-blue-72148223'>Có, tôi muốn</button></div></div></div></div>",
        replace: true,
        link: function (scope, element, attr) {
            var faicon = 'fa fa-check txt txt-green-1eba5c';
            scope.txtTest = $sce.trustAsHtml("<p class='txt-sz-18px'>Bạn có muốn nhận thông báo qua trình duyệt hàng ngày</p>" +
                "<ul class='text-left'>" +
                "<li><i class='" + faicon + "'></i> Chương trình khuyến mãi mới nhất</li>" +
                "<li><i class='"+ faicon +"'></i> Tin tức nổi bật</li>" +
                "<li><i class='"+ faicon +"'></i> Thông báo từ hệ thống</li>" +
                "</ul>");
            scope.toastAction = function (pr) {
                if(pr == 0) {
                    element.css('display', 'none');
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 60);
                    $cookies.put("desktopNotification", 'denied', {'expires': expireDate, 'path': '/'});
                    $http.post('/api/notification/subscriptionlog', JSON.stringify({permission: 'denied'}), {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).success(function (data) {});
                }
                else {
                    if (Notification.permission !== "granted") {
                        Notification.requestPermission(function(result){
                            $http.post('/api/notification/subscriptionlog', JSON.stringify({permission: result, step: 2}), {
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8'
                                }
                            }).success(function (data) {});
                        });
                    }
                    element.css('display', 'none');
                }
            }
        }
    }
}

directiveApp.directive('toastAlert', toastAlert);

toastAlert.$inject = ['$timeout'];

function toastAlert($timeout) {
    return {
        restrict: 'AE',
        scope: {
            ngShow: '='
        },
        link: function (scope, element, attr) {
            var definePosition = ['top', 'left', 'right', 'bottom'];
            element.addClass('mt-alert').css({
                position: 'fixed',
                top: '10%',
                left: '10%',
                right: '10%',
                zIndex: 10000
            });

            scope.$watch('ngShow', function(vl, nvl) {
                if(vl !== undefined) {
                    $timeout(function () {
                        element.hide(500);
                        scope.ngShow = undefined;
                    }, 7500);
                }
                if(nvl !== undefined) {
                    element.show(500);
                }
            });
        }
    }
}