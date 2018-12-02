(function(){
	"use strict";
	// Set up the controller
	angular.module('whoisDomainNameApp', ['translateApp'])
	.controller ('whoisDomainNameCtrl', whoisDomainNameCtrl);

	whoisDomainNameCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookies', '$window', 'whoisService', '$sce', 'serviceApiGlobal'];

	function whoisDomainNameCtrl ($scope, $rootScope, $http, $cookies, $window, whoisService, $sce, serviceApiGlobal) {
		$scope.whois = {};
		$scope.query = serviceApiGlobal.getParams('domain');
	    var query = serviceApiGlobal.getParams('domain');
		$scope.dmInOrderExist = false;
		$scope.detectMobile = serviceApiGlobal.detectMobile();
		//Các biến khởi tạo để sử dụng các hàm đã có ở whoisService
		$scope.rdhtml = function (html) {
			return $sce.trustAsHtml(html);
		};

		$scope.search = function(){
    		if($scope.query != ''){
    			$window.location.href = '/dang-ky-ten-mien?domain=' + $scope.query;
    		}
        };
        
        $scope.continueToCart = function () {
        	if ($cookies.get('order') == undefined) {
            	$scope.autoAddDomain($scope.whois.domainName);
            } else {
            	$window.location.href = '/domain/domain-config';
            }
        };

        var query = serviceApiGlobal.getParams('domain');
        query = query.replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
        if(query.length <= 0){
        	if($scope.query == undefined){
        		return;        		
        	}
        }

	    $scope.searchAgain = function (query) {
	    	$scope.whois.domainName = false;
            query = query.replace('http://www.', '');
            query = query.replace('https://www.', '');
            query = query.replace('http://', '');
            query = query.replace('https://', '');
	        query = query.replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
	        if(query.length <= 0){
	        	return;
	        }	        
	        $scope.queryLengthValidation = false;
			$scope.queryWhois(query);
	        //lấy ra tên miền chính xác
			whoisService.domainsSpecify(query).promise.then(function(response){
				getDomainsSpecify(response.data, response.data, true);
				if ($cookies.get('order') != undefined) {
					var orderCookies = JSON.parse($cookies.get('order'));
					for (var c = 0; c < orderCookies.length; c++) {
						if (orderCookies[c].domainName == response.data.domainName) {
							$scope.whois.productSelected = true;
							$scope.available = true;
						}
					}
				}
			});

	        $scope.selectedSuffix = [];

	        //lấy ra danh sách tên miền gợi ý
	        $scope.suggestionDomain = function (domainName) {
				whoisService.domainssuggestion().getDomainSugges(query).then(function (resp) {
					var data = resp.data;
					for (var i=0; i < data.length; i++) {
						if (data[i].domainName == $scope.whois.domainName) {
							data[i].show = false;
							continue;
						}
						data[i].show = true;
						data[i].available = true;
						if ($cookies.get('order') != undefined) {
							var orderCookies = JSON.parse($cookies.get('order'));
							for (var c = 0; c < orderCookies.length; c++) {
								if (orderCookies[c].domainName == data[i].domainName) {
									data[i].productSelected = true;
									data[i].notavailable = false;
									data[i].checkDomain = true;
								}
							}
						}
					}
					$scope.whoisSuggestion = data;
					for (var j = 0; j < $scope.whoisSuggestion.length; j++) {
						if($scope.whoisSuggestion[j].suffix == 'net' ||
							$scope.whoisSuggestion[j].suffix == 'com.vn' ||
							$scope.whoisSuggestion[j].suffix == 'com' ||
							$scope.whoisSuggestion[j].suffix == 'xyz'  ||
							$scope.whoisSuggestion[j].suffix == 'vn' ){
								$scope.whoisSuggestion[j].show = false;
							if($scope.whoisSuggestion[j].domainName == $scope.whois.domainName){
								$scope.whoisSuggestion[j].showExist = true;
							}
							$scope.checkAvailableDefault($scope.whoisSuggestion[j].domainName);
						} else {
							if($scope.whoisSuggestion[j].domainName == $scope.whois.domainName){
								$scope.whoisSuggestion[j].showExist = true;
							}
						}
					}
				});
	        };
	        //Lấy ra danh sách đuôi tên miền hỗ trợ
			whoisService.getSuffix().promise.then(function(response){
				var suf = response.data;
				$scope.suffix = suf;
			});

	        //hàm filter đuôi tên miền
	        $scope.filterSuffix = function (bool, suffix) {
	            if (bool) {
	                $scope.selectedSuffix.push(suffix);
	                $scope.suggestionDomain();
	            } else {
	                var index = -1;
	                for (var i = 0; i < $scope.selectedSuffix.length; i++) {
	                    if ($scope.selectedSuffix[i].suffix === suffix.suffix) {
	                        index = i;
	                        break;
	                    }
	                }
	                $scope.selectedSuffix.splice(index, 1);
	                $scope.suggestionDomain();
	            }
	        };
	    };

	    $scope.searchAgainModal = function(query){
			$scope.searchAgain(query);
		};
	    if ($cookies.get('order') != undefined) {
	        $scope.order = JSON.parse($cookies.get('order'));
	    }
		//Hàm kiểm tra trạng thái tên miền -> Hàm này vẫn cần phải phát triển thêm vì chưa tối ưu
		function checkDomainStatus(domain, nameSt, logicSt) {
			$scope.whoisSuggestion.forEach(function (dm, i) {
				if(dm.domainName == domain) {
					$scope.whoisSuggestion[i][nameSt] = logicSt;
				}
			});
		}
		//Kiểm tra tên miền có tồn tại hay không
		$scope.checkAvailable = function (domain) {
			$scope.whoisSuggestion.forEach(function (data, i) {
				if(data.domainName === domain) {
					$scope.whoisSuggestion[i].productSelected = false;
					$scope.whoisSuggestion[i].loading = true;
					// $scope.whois.productSelected = true;
					$scope.available = true;
				}
			});
			whoisService.domainsSpecify(domain).promise.then(function (resp) {
				var respdata = resp.data;
				if(respdata.code == '1') {
					checkDomainStatus(respdata.domainName, 'checkDomain', true);
				}
				else {
					checkDomainStatus(respdata.domainName, 'productSelected', false);
					checkDomainStatus(respdata.domainName, 'notavailable', true);
				}
				$scope.whoisSuggestion.forEach(function (data, i) {
					if(data.domainName == domain) {
						$scope.whoisSuggestion[i].loading = false;
					}
				});
			});
		};
		//Đưa tên miền vào giỏ hàng
		$scope.selectToCart = function (domainName) {
            $scope.whois.productSelected = false;
            $scope.whois.notavailable = false;
            $scope.whois.loading = true;
			$scope.whoisSuggestion.forEach(function (data, i) {
				if(data.domainName == domainName) {
					$scope.whoisSuggestion[i].productSelected = false;
					$scope.whoisSuggestion[i].notavailable = false;
					$scope.whoisSuggestion[i].loading = true;
				}
			});
			$http.get('/api/order/checkavailable/'+domainName).then(function(response){
				var resdata = response.data;
                $scope.whois.loading = false;
				getDomainsSpecify(resdata);
				var order = [];
				if (resdata.code == '1' || resdata.status == 'available') { //tên miền chưa tồn tại
					if(resdata.domainName == undefined){
						resdata.domainName = resdata.name;
					}
					if ($cookies.get('order') != undefined) {
						var orderCookies = JSON.parse($cookies.get('order'));
						for (var i = 0; i < orderCookies.length; i++) {
							if (orderCookies[i].domainName != resdata.domainName) {
								order.push(orderCookies[i]);
							}
						}
					}
					order.push(resdata);
					// if(resdata.domainName.indexOf('.vn') > 0){
					// 	var obj = {};
					// 	obj.domainName = resdata.domainName;
					// 	obj.serviceType = 'domain';
					// 	obj.period = 12;
					// 	obj.action = 'registry-lock';
					// 	obj.proceed = 'add';
					// 	order.push(obj);
					// }
					//để cookie kéo dài 1 ngày
					var expireDate = new Date();
					expireDate.setDate(expireDate.getDate() + 1);
					//phần này cần tunning lại khi độ dài của cookie có giới hạn.
					$cookies.put('order', JSON.stringify(order), {
						'expires': expireDate,
						'path':'/'
					});
					$scope.order = order;
					checkDomainStatus(resdata.domainName, 'productSelected', true);
					if (resdata.domainName == $scope.whois.domainName) {
						$scope.whois.productSelected = true;
					}
				} else {
					$scope.whoisSuggestion.forEach(function (data, i) {
						if(data.domainName == resdata.domainName) {
							$scope.whoisSuggestion[i].productSelected = false;
							$scope.whoisSuggestion[i].notavailable = true;
						}
					});
				}
			});
		};
		
		$scope.checkAvailableDefault = function (domainName) {
			$http.get('/api/order/checkavailable/'+domainName).then(function(response){
				var resdata = response.data;
				if (resdata.code == '1') { //tên miền chưa tồn tại
					
				} else {
					$scope.whoisSuggestion.forEach(function (data, i) {
						if(data.domainName == resdata.domainName) {
							$scope.whoisSuggestion[i].productSelected = false;
							$scope.whoisSuggestion[i].notavailable = true;
						}
					});
				}
			});
		};
		
	    //check tồn tại của tên miền combo để đưa vào giỏ hàng
	    $scope.checkAvailableCombo = function () {
	        $scope.domainNameCombo = '';
	        for (var z = 0; z < $scope.whoisCombo.length; z++) {
	        	$scope.domainNameCombo += $scope.whoisCombo[z].domainName + ',';
	            for (var i = 0; i < $scope.whoisSuggestion.length; i++) {
	                if ($scope.whoisSuggestion[i].domainName == $scope.whoisCombo[z].domainName) {
	                    $scope.whoisSuggestion[i].productSelected = true;
	                }
	            }
	            if ($scope.whoisCombo[z].domainName == $scope.whois.domainName) {
	                $scope.whois.productSelected = true;
	            }
	        }
	        $scope.whoisCombo.productSelected = true;
	        var order = [];
	        if ($cookies.get('order') != undefined) {
	            var orderCookies = JSON.parse($cookies.get('order'));
	            for (var i = 0; i < orderCookies.length; i++) {
	                if (orderCookies[i].domainName != $scope.domainNameCombo && $scope.domainNameCombo != "") {
	                    order.push(orderCookies[i]);
	                }
	            }
	        }
	        var domainCombo = new Object();
	        domainCombo.domainName = $scope.domainNameCombo.substring(0, $scope.domainNameCombo.length - 1);
	        domainCombo.serviceType = 1;
	        domainCombo.period = 1;
	        domainCombo.feeReg = $scope.feeRegCombo;
	        domainCombo.feeRegOrigin = $scope.feeRegOriginCombo;
	        domainCombo.feeRen = $scope.feeRenCombo;
	        domainCombo.feeRenOrigin = $scope.feeRenOriginCombo;
	        domainCombo.combo = 1;
	        domainCombo.action = 'CREATE';
	        order.push(domainCombo);
	        //để cookie kéo dài 1 ngày
	        var expireDate = new Date();
	        expireDate.setDate(expireDate.getDate() + 1);
	        //phần này cần tunning lại khi độ dài của cookie có giới hạn.
	        $cookies.put('order', JSON.stringify(order), {
	            'expires': expireDate,
	            'path':'/'
	        });
	        $scope.order = order;
	    };

	    //Xóa 1 tên miền trên đơn hàng(phần này sau sẽ viết hàm chung)
	    $scope.removeProduct = function (domainName) {
	        var order = [];
	        var orderCookies = JSON.parse($cookies.get('order'));
	        for (var i = 0; i < orderCookies.length; i++) {
	            if (orderCookies[i].domainName != domainName) {
	                order.push(orderCookies[i]);
	            }
	        }
	        var expireDate = new Date();
	        expireDate.setDate(expireDate.getDate() + 1);
	        //phần này cần tunning lại khi độ dài của cookie có giới hạn.
	        $cookies.put('order', JSON.stringify(order), {
	            'expires': expireDate,
	            'path':'/'
	        });
	        $scope.order = order;
			$scope.whoisSuggestion.forEach(function (data, i) {
				if(data.domainName == domainName) {
					$scope.whoisSuggestion[i].productSelected = false;
					$scope.whoisSuggestion[i].notavailable = false;
					$scope.whoisSuggestion[i].loading = false;
				}
			});
	        if (domainName == $scope.whois.domainName) {
	            $scope.whois.productSelected = false;
	        }
	    };
	    
	  //Xóa tên miền cômbo trên đơn hàng(phần này sau sẽ viết hàm chung)
	    $scope.removeProductCombo = function (domainNameCombo) {
	        var order = [];
	        var orderCookies = JSON.parse($cookies.get('order'));
	        for (var i = 0; i < orderCookies.length; i++) {
	            if (orderCookies[i].domainName != domainNameCombo) {
	                order.push(orderCookies[i]);
	            }
	        }
	        var expireDate = new Date();
	        expireDate.setDate(expireDate.getDate() + 1);
	        //phần này cần tunning lại khi độ dài của cookie có giới hạn.
	        $cookies.put('order', JSON.stringify(order), {
	            'expires': expireDate,
	            'path':'/'
	        });
	        $scope.whoisCombo.productSelected = false;
	        $scope.order = order;
	        var combo = domainNameCombo.split(',');
	        for(var i = 0; i < combo.length; i++){
	        	for (var j = 0; j < $scope.whoisSuggestion.length; j++) {
	                if ($scope.whoisSuggestion[j].domainName == combo[i]) {
	                    $scope.whoisSuggestion[j].productSelected = false;
	                }
	            }
	        	if (combo[i] == $scope.whois.domainName) {
	                $scope.whois.productSelected = false;
	            }
	        }
	    };
	    
		
	    //Ham click link continue cart (HoBv viet) sau se su dung de kiem tra khi user tuong tac click
	    $scope.continueToCart = function () {
	    	if ($cookies.get('order') == undefined) {
	        	$scope.autoAddDomain($scope.whois.domainName);
	        } else {
	        	$window.location.href = '/domain/domain-config';
	        }        
	    };
	    
	  	//check tồn tại của tên miền để tự động đưa vào giỏ hàng
	    $scope.autoAddDomain = function (query) {
	        whoisService.checkAvailable(query).promise.then(function(response){
				var resdata = response.data;
				var order = [];
				if (resdata.code == '1') { //tên miền chưa tồn tại
					if ($cookies.get('order') != undefined) {
						var orderCookies = JSON.parse($cookies.get('order'));
						for (var i = 0; i < orderCookies.length; i++) {
							if (orderCookies[i].domainName != resdata.domainName) {
								order.push(orderCookies[i]);
							}
						}
					}
					order.push(resdata);
					var expireDate = new Date();
					expireDate.setDate(expireDate.getDate() + 1);
					$cookies.put('order', JSON.stringify(order), {
						'expires': expireDate,
						'path':'/'
					});
					$scope.order = order;
					for (var i = 0; i < $scope.whoisSuggestion.length; i++) {
						if ($scope.whoisSuggestion[i].domainName == resdata.domainName) {
							$scope.whoisSuggestion[i].productSelected = true;
						}
					}
					if (resdata.domainName == $scope.whois.domainName) {
						$scope.whois.productSelected = true;
					}
					$window.location.href = '/domain/domain-config';
				} 
			});
	    };
		//hàm lấy ra tên miền chính xác
		function getDomainsSpecify(response, domainTop, suggest){
			$scope.MSG = '';
			$scope.domainCode = response.code;
			if(response.status == 'notavailable'){
				$scope.MSG = "là tên miền đặc biệt, vui lòng liên hệ với iNET";
				$scope.available = false;
			} else if(response.costHash == true){
                $scope.MSG = "là tên miền đặc biệt, vui lòng liên hệ với iNET";
                $scope.available = false;
            } else if (response.code == '1') {
				$scope.available = true;
			} else if (response.status == 'available') {
				response.domainName = response.name;
				$scope.available = true;
			}
			else if(response.code == '0') {
				$scope.MSG = "đã được đăng ký";
				$scope.available = false;
			}
			else if(response.code == '3'){
				$scope.MSG = "không hỗ trợ đuôi tên miền này";
				$scope.available = false;
			}
			else if(response.code == '4'){
				$scope.MSG = "có đuôi tên miền .vn cấp hai chưa được cấp phép";
				$scope.available = false;
			}
			else {
				$scope.available = false;
			}
			if(domainTop) {
				$scope.whois = domainTop;
			}
			if(suggest) {
                $scope.suggestionDomain();
            }
		}
		//hàm lấy ra danh sách chiến dịch combo(fix cứng)
		function getDomainsCombo(response){
			for (var i = 0; i < response.length; i++) {
				if (response[i].code == '1' && response[i].length == 3) {
					$scope.comboAvailable = true;
				} else {
					break;
				}
			}
			$scope.whoisCombo = response;
			$scope.feeRegCombo = 210000;
			$scope.feeRegOriginCombo = 350000;
			$scope.feeRenCombo = 594000;
			$scope.feeRenOriginCombo = 990000;
		}

		$scope.queryWhois = function(query){
			var email = $cookies.get('email');
			$http.post('/api/common/querywhois', {query: query, email : email}, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).success(function (data) {

			});
		}
	};
})();