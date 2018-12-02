(function () {
    "use strict";
    angular.module('headerApp', [
        'ngCookies',
        'ui.bootstrap',
        'angularMoment',
        'serviceApiGlobalApp',
        'directiveGlobalApp',
        'translateApp'
    ])
    .controller('headerCtrl', headerController);

        function headerController ($scope, $http, $sce,  $cookies, $window, serviceApiGlobal, moment, $timeout, $translate, menuService, $rootScope) {
            var vm = this;
            vm.url = document.URL;

            vm.trustHTML = function(str){
                return $sce.trustAsHtml(str);
            };


            //Demo date in notification
            $scope.getDateTime = new Date();

            var _mainMenu = undefined,
                _controlMenu = undefined;

            $http.get("https://sso.inet.vn/logo/common")
                .then(function(response) {
                    vm.logo = response.data;
                });

            $http.post('/api/account/getsession', '', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                if(data.status == 'success'){
                    vm.account = data.data;
                    if(vm.account.socketid) {
                        socket.on(vm.account.socketid, function (data) {
                            $scope.$apply(function() {
                                vm.notifications.push(data);
                                vm.unread++;
                                vm.updateTitle();
                            });
                        });
                    }
                    vm.getNotifications();
                }
            });

            var socket = io.connect('https://pushmessage.inet.vn:443/');

            var titleNewMessage = "Bạn có tin nhắn mới ";
            var titleDefault = document.title;
            vm.updateTitle = function() {
                if(vm.unread > 0) {
                    document.title = '(' + vm.unread + ') ' + titleDefault;
                } else {
                    document.title = titleDefault;
                }
            }

            vm.unread = 0;
            vm.notifications = [];
            vm.getNotifications = function() {
                $http.post('/api/notification/list', '', {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (data) {
                    vm.notifications = data;
                    for(var i = 0; i < vm.notifications.length; i++){
                        if(vm.notifications[i].status == 'unread'){
                            vm.unread++;
                            vm.updateTitle();
                        }
                    }
                });
            }

            vm.actionNotification = function(notification){
                $http.post('/api/notification/read', JSON.stringify({id: notification._id}), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (data) {
                    vm.unread--;
                })
                if(notification.link){
                    $window.location.href = notification.link;
                }
            }

            vm.markAllAsRead = function(){
                for(var i = 0; i < vm.notifications.length; i++){
                    if(vm.notifications[i].status == 'unread'){
                        $http.post('/api/notification/read', JSON.stringify({id: vm.notifications[i]._id}), {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (data) {
                            vm.unread--;
                            vm.updateTitle();
                        })
                        vm.notifications[i].status = 'read';
                    }
                }
            }

            if($cookies.get('locale')){
                vm.locale = $cookies.get('locale');
            } else {
                vm.locale = 'vi';
            }
            vm.changeLocale = function(locale){
                $cookies.put('locale', locale);
                $window.location.reload();
            }

            $scope.closeAction = false;
            $scope.checkUrl = $window.location.pathname;
            $scope.wallet = 0;
            $scope.tokenId = $cookies.get('tokenId');
            $scope.email = $cookies.get('email');
            $scope.fullname = $cookies.get('fullname');
            $scope.openClass = false;
            //Ham click toggle class

            $scope.viewsAcount = function () {
                var myEl = angular.element('body').find('#main-content');
                $scope.openClass = !$scope.openClass;
                if($scope.openClass === true) {
                    $(myEl).append('<div id="views-acount"></div>');
                }
                else {
                    angular.element('body').find('#views-acount')[0].remove();
                }
            };

            //Ham click outside remove su kien click o tren
            $scope.hackClickOutside = function() {
                $scope.openClass = false;
                angular.element('body').find('#views-acount')[0].remove();
            };
            //Start he thong cac menu cua iNET cpanel
            _mainMenu = menuService.mainMenu();
            _mainMenu.promise.then(function (resp) {
                $scope.mainMenus = resp.data;
            });

            _controlMenu = menuService.controlMenu();
            _controlMenu.promise.then(function(resp){
                $scope.controlMenus = resp.data;
            });


            $scope.viewCampaign = function(){
                $scope.campaignViewing = true;
            };

            $scope.menuDoubleClick = function(link){
                $window.location.href = link;
            };

            //---------(mr.Tiger)--------------------
            //close banner quảng cáo inet-ads-campain
            if($cookies.get("ads_shows") == undefined && $cookies.get("tokenId") == undefined){
            	$scope.show = true;
            }
            $scope.close = function () {
                $scope.show = false;
                var expireDate = new Date();
        		expireDate.setDate(expireDate.getDate() + 1);
        		$cookies.put('ads_shows', false, {'expires': expireDate, 'path':'/'});
            };
            //Quảng cáo tên miền đẹp trên BackOrder
            serviceApiGlobal.backOrder().getBO().then(function (resp) {
                $scope.backorder = resp.data;
            });
            //Close banner quảng cáo tên miền BO
            $scope.closeTopAds = function () {
                $scope.closeAction = true;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.put('bo_shows', false, {'expires': expireDate, 'path':'/'});

            };
            if($cookies.get("bo_shows") != undefined || $cookies.get("tokenId") != undefined){
                $scope.closeAction = true;
            }


            var aff = getParams("aff");
            if(aff != undefined && aff != ""){
                if($cookies.get('email') != undefined){
                    $scope.targetEmail = $cookies.get('email');
                }
                var params = { aff: aff, affSource: getParams("affSource"), url: document.URL, targetEmail: $scope.targetEmail};
                $http.post('/api/affiliate/click/statistic', params, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (data) {

                });
            }

            setInterval(function(){
                $scope.$apply(function () {
                    if($cookies.get('order') != undefined){
                        $scope.cart = JSON.parse($cookies.get('order')).length;
                    }
                });
            },1000)
        }

    angular
        .element( document )
        .ready( function() {
            var header = document.getElementById('header');
            angular.bootstrap( header, [ 'headerApp' ]);
        });
})();


function getParams(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}