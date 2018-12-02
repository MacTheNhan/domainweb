(function(){
	"use strict";
	var app = angular.module('footerApp', [
		'ui.bootstrap',
		'ngCookies',
		'directiveGlobalApp',
	    'serviceApiGlobalApp',
        'translateApp'
	]);
	app.controller('footerMenuCtrl', footerMenuController);
	
	function footerMenuController ($scope, $http, serviceApiGlobal, $uibModal, $timeout, $interval, $window, menuService, $cookies) {

        menuService.footerMenu('desktop').promise.then(function(resp){
            $scope.footerMenus = resp.data;
        });
	    //End he thong cac menu cua iNET cpanel
        $scope.dmcaId = "58462ecf-b960-4ae7-ab30-6ff524fc517c&refurl=https://inet.vn";
        
        $http.get('/api/common/getip').success(function (data) {
            $scope.ip = data;
        });
		
		$scope.getHeightQlct = function () {
			return {height: $(ctHeight).innerHeight() + 'px'};
		};

		$scope.animationsEnabled = true;

		$scope.items = {
			fullname: '',
			phone: '',
			serviceType: '',
			address: 'HN'
		};

		$scope.iPenGuinOpen = function (size, parentSelector) {
			var parentElem = parentSelector ?
				angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'iPenGuinModal.html',
				controller: ModalInstanceCtrl,
				controllerAs: '$ctrl',
				size: size,
				appendTo: parentElem,
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});
		};
		
		$scope.mapLocation = function (size, place) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'mapLocation.html',
				controller: mapLocationCtrl,
				controllerAs: '$ctrl',
				size: size,
				resolve: {
					local: function () {
						return place;
					}
				}
			});
		};
        $scope.phoneData = [
            {
                title: 'Kinh doanh HN',
                tlp: '024 3838 5588',
            },
            {
                title: 'Kinh doanh HCM',
                tlp: '028 6287 3964',
            },
            {
                title: 'Support 24/7',
                tlp: '0904 885 055',
                hotp: '0904 885 056'
            }
        ];
        $scope.btnRightControlScreen = '';
        $scope.showHideBtn = function (s) {
            angular.element('body').css('overflow', '');
            $scope.btnRightControlScreen = s;
        };

        $scope.isSelectedBtn = function (s) {
            return $scope.btnRightControlScreen === s;
        };
        $scope.closePopup = function () {
            $scope.btnRightControlScreen = '';
        };

        // setup time callback
        function setTimeCallBack() {
            var currentTime= moment();
            var startTime = moment('6:00 pm', "HH:mm a");
            var endTime = moment('8:00 am', "HH:mm a").add(1, 'day');

            $scope.amIBetween = currentTime.isBetween(startTime , endTime);
        }
        $interval(setTimeCallBack, 1000);
		//Đăng ký nhận Email KM
		$scope.focusEm = function () {
			$scope.focusMe = true;
        };

		$scope.eNewsletters = function (e) {
            $scope.focusMe = false;
            $scope.messagesAlert = undefined;

			if(e === undefined) {
                $scope.messagesAlert = 'Bạn chưa nhập email';
			}
			else {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(e.email)) {
                    $scope.messagesAlert = 'Bạn nhập chưa đúng định dạng Email';
                    return false;
                }
                else {
                    $window.location.href = '/subscription?email=' + e.email;
                    return true;
                }
			}
        };

        function ModalInstanceCtrl($uibModalInstance, items, $scope, $http) {
            var $ctrl = this;
            $scope.items = items;
            $ctrl.send = function () {
                if(items.fullname == undefined || items.fullname == '' || items.phone == undefined || items.phone == ''){
                    return;
                }
                $scope.isSubmit = true;
                var params = {
                    fullname: items.fullname,
                    phone: items.phone,
                    serviceType: items.serviceType,
                    address: items.address
                };
                $http.post('/api/crm/callbackphone', JSON.stringify(params), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).success(function (data) {
                    params.template = 'callcustomer';
                    $http.post('/api/notification/push', params,
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function(dataPush) {

                    });
                });
            };

            $ctrl.close = function () {
                $uibModalInstance.close();
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }

        function mapLocationCtrl($uibModalInstance, local) {
            var $ctrl = this;
            $ctrl.checkPlace = local;
            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                registration.update();
            });
        }
    }


    app.controller('searchEverythingCtrl', searchEverythingCtrl);

    searchEverythingCtrl.$inject = ['$scope','$window', '$http'];

    function searchEverythingCtrl($scope, $window, $http) {
        //Demo history search
        $scope.keywordSearch = undefined;
        var urlpost = "https://helpdesk.inet.vn/search?f=all&q=";
        //Demo clear keyword
        $scope.clearKeyword = function () {
            $scope.keywordSearch = '';
        };
        //Demo search summit form
        $scope.search = function () {
            $window.location.href = urlpost + $scope.keywordSearch;
        };

        $scope.searchIndex = function() {
            if($scope.keywordSearch == undefined || $scope.keywordSearch == ''){
                return;
            }
            return $http.post('https://helpdesk.inet.vn/api/client/v1/index/search', JSON.stringify({query: $scope.keywordSearch}), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(response){
                return response.data.content;
            });
        }

    }

    angular.bootstrap(document.getElementById("footer"),['footerApp']);
})();