(function () {
    "use strict";

    var app = angular.module("landingPageApp", [
        'ngSanitize',
        'serviceApiGlobalApp',
        'directiveGlobalApp',
        'rzModule',
        'ui.bootstrap',
        'ngCookies',
        'filter.global',
        'whoisModuleService',
        'angularMoment',
        'agencyRegisterApp',
        'translateApp'
    ]);

    app.run(function ($templateCache) {
        $templateCache.put('trial7day.html', '<div class="modal-header">' +
            '<button class="close" type="button" ng-click="$ctrl.cancel()"><i class="ion-ios-close-empty"></i></button>' +
            '<h4 class="modal-title text-center" id="modal-title-trial7d">Chương trình trải nghiệm 3 ngày miễn phí dịch vụ tại iNET</h4></div>' +
            '<div class="modal-body" id="modal-body-trial7d">' +
            '<form name="frmTrialSv" class="form-horizontal">' +
            '<div class="form-group"><label for="nameSv" class="col-sm-3 control-label">Gói<span class="txt-red">*</span></label><div class="col-sm-9"><select class="form-control" ng-options="item as item.name for item in $ctrl.items | orderBy:\'name\' track by item.name" ng-model="$ctrl.selected"></select></div></div>' +
            '<div class="form-group"><label for="fullName" class="col-sm-3 control-label">Tên miền<span class="txt-red">*</span></label><div class="col-sm-9"><input type="text" class="form-control" id="domain" placeholder="Nhập tên miền" ng-model="$ctrl.domainName" required></div></div>' +
            '<div class="form-group"><label for="fullName" class="col-sm-3 control-label">Họ và tên<span class="txt-red">*</span></label><div class="col-sm-9"><input type="text" class="form-control" id="fullName" placeholder="Nhập họ và tên" ng-model="$ctrl.fullname" required></div></div>' +
            '<div class="form-group"><label for="nameSv" class="col-sm-3 control-label">Email<span class="txt-red">*</span></label><div class="col-sm-9"><input type="email" class="form-control" id="emailSv" placeholder="Nhập email" required ng-model="$ctrl.email"></div></div>' +
            '<div class="form-group"><label for="phoneNumber" class="col-sm-3 control-label">Số điện thoại<span class="txt-red">*</span> </label><div class="col-sm-9"><input type="text" class="form-control" id="phoneNumber" placeholder="Nhập số điện thoại" required ng-model="$ctrl.phone"></div></div>' +
            '<div class="form-group"><label for="place" class="col-sm-3 control-label">Khu vực<span class="txt-red">*</span></label><div class="col-sm-9"><label class="radio-inline"><input type="radio" ng-model="$ctrl.place" value="MB"/> Miền Bắc</label> <label class="radio-inline"><input type="radio" ng-model="$ctrl.place" value="MN"/> Miền Nam</label></div></div>' +
            '<div class="form-group"><div class="col-sm-offset-3 col-sm-9"><button type="submit" class="btn bg-red-d63d36" ng-click="$ctrl.registerTrial()" ng-if="!$ctrl.loading">Đăng ký ngay</button><span ng-if="$ctrl.loading">Đang xử lý...</span></div></div></form><div class="alert alert-success" role="alert" ng-if="$ctrl.status == \'success\'"><p class="txt-sz-16px">Chúc mừng quý khách đã đăng ký dùng thử thành công gói dịch vụ <strong ng-bind="$ctrl.pkname"></strong><br/>Quý khách vui lòng mở mail để xác nhận hoàn tất việc đăng ký.</p></div><div class="alert alert-warning" role="alert" ng-if="$ctrl.status == \'success\'">(Đừng quên kiểm tra thêm trong mục <strong>spam thư rác</strong>, nếu email rơi vào mục này quý khách vui lòng đánh dấu <strong>Not Spam</strong> để có thể dễ dàng tìm thấy nhanh email từ các chương trình khuyến mãi của iNET)<br/>Nếu trong tối đa 10 phút Quý khách không nhận được email nào, vui lòng phản hồi lại cho iNET để nhận được hỗ trợ.</div><div class="alert alert-danger" role="alert" ng-if="$ctrl.status == \'error\'">{{$ctrl.message}}</div></div>');
    });

    app.controller("landingPageCtrl", landingPageController);

    landingPageController.inject = ['$scope', 'serviceApiGlobal', '$window', '$sce', '$timeout', '$http', '$cookies', 'whoisService', '$interval', 'moment', '$uibModal', '$templateCache', 'iNETService'];

    function landingPageController($scope, serviceApiGlobal, $window, $timeout, $http, $cookies, whoisService, $interval, moment, $uibModal, $templateCache, iNETService) {
        //Tiger Bui demo get point page
        $scope.getpoint = '/public/img/banners/get-point-ldp-header.png';
        if($cookies.get('sid')){
            $scope.signed = true;
        }

        $scope.domainNameParam = serviceApiGlobal.getParams('domainName');
        $http.post('/api/enduser/detail', '', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
            $scope.account = data;
        });
        var eSubs = $cookies.get('emailSubs');
        if (eSubs !== undefined) {
            var parseE = JSON.parse(eSubs);
            $scope.emailSubs = parseE;
        }
        $scope.findDomainSbst = function (dmn) {
            if (dmn !== undefined) {
                $window.location.href = "https://inet.vn/dang-ky-ten-mien?domain=" + dmn;
            }
        };

        //faq
        $scope.oneAtATime = true;
        //Banklist
        serviceApiGlobal.bankList().getBankList().then(function (resp) {
            $scope.bankList = resp.data;
        });
        //Nhân viên tư vấn
        $scope.saleSuportData = serviceApiGlobal.saleSuport();
        //Loading setInterval
        $scope.hiddenLoading = true;
        function loaddingPage() {
            $scope.hiddenLoading = false;
        }

        $timeout(loaddingPage, 500);

        function fn_imgAddService(url, imgAsv) {
            if (locationPath == url) {
                $scope.imgAddedSv = imgAsv;
            }
        }

        $scope.renderHTML = function (html) {
            return serviceApiGlobal.renderHtml(html);
        };

        var locationPath = angular.lowercase($window.location.pathname);

        var pushInPriceTable = [
            {
                "icons": "ion-android-walk"
            },
            {
                "icons": "ion-android-bicycle"
            },
            {
                "icons": "ion-android-bus"
            },
            {
                "icons": "ion-android-boat"
            },
            {
                "icons": "ion-android-plane"
            }
        ];
        var prtbdesdatamock = iNETService.prtbdatamock();
        $scope.showHiderm = false;
        $scope.showHide = function () {
            serviceApiGlobal.offSetTop("#trialRgSV");
            $scope.showHiderm = !$scope.showHiderm;
        };
        $scope.priceTb = function (id) {
            serviceApiGlobal.offSetTop(id);
        };
        $scope.showHideFaq = function (st) {
            st.isFirstOpen = !st.isFirstOpen;
        };
        //setup thời gian chiến dịch tự động tắt
        var future, stop;
        future = new Date('Mar 24, 2017 23:59:59');

        if (angular.isDefined(stop)) {
            return;
        }
        $scope.saleOff = {};
        $scope.htSaleOff = 1;
        $scope.$on('saleVal', function (err, val) {
            if (val !== undefined || val !== '') {
                $scope.htSaleOff = val;
            }
        });
        $scope.checkUrlLocaltion = locationPath;
        $scope.priceSvData = [];
        $scope.extendData = {};
        function fn_addIconToPricePkName(index, icn) {
            $scope.extendData[index] = icn;
        }

        //Linux hosting
        fn_priceServiceTable('/hosting', 'hosting', "linux-new");
        //Joomla wordpress hosting
        fn_priceServiceTable('/hosting/wordpress-hosting', 'hosting', "wordpress-new");
        //Joomla wordpress hosting
        fn_priceServiceTable('/hosting/web-hosting', 'hosting', "wordpress-new");
        //Seo hosting
        fn_priceServiceTable('/hosting/seo-hosting', 'hosting', "seo-class-c");
        //Reseller hosting
        fn_priceServiceTable('/hosting/reseller-hosting', 'hosting', "reseller");
        //Hosting Doanh Nghiệp
        fn_priceServiceTable('/hosting/business-hosting', 'hosting', "business");
        //Email business
        fn_priceServiceTable('/email-theo-ten-mien', 'email', "email-new");
        //Big mail
        fn_priceServiceTable('/email/big-mail', 'email', "email-new");
        //Email Server riêng
        fn_priceServiceTable('/email/email-server-rieng', 'email', "Email Server");
        //VPS
        fn_priceServiceTable('/vps', 'vps', "cloud-new");
        //SSL
        fn_priceServiceTable('/ssl', 'ssl', "geotrust");
        //SSL Comodo
        fn_priceServiceTable('/ssl/ssl-comodo', 'ssl', "sslcomodo");
        //SSL Free
        fn_priceServiceTable('/ssl/ssl-free', 'ssl', "sslfree");

        function fn_priceServiceTable(curl, svtype, svname) {
            if (locationPath == curl) {
                var datapage = iNETService.ldPageSvData();
                $scope.nameSv = svname.toLowerCase().replace(/-|\s/g, '');
                $scope.svType = svtype;
                serviceApiGlobal.packageList(svtype, svname).promise.then(function (respon) {
                    $scope.priceSvData = respon.data.content;
                    var priceResData = respon.data.content;
                    for (var i = 0; i < priceResData.length; i++) {
                        fn_addIconToPricePkName(i, pushInPriceTable[i].icons); //Add icon to price-table on mobile device - TigerBui
                        //Add promotion setup for campaign MKT - Mr.Do
                        if (priceResData[i].promotionFrom != undefined && priceResData[i].promotionTo != undefined) {
                            var fromDate = moment(priceResData[i].promotionFrom, 'MM/DD/YYYY HH:mm');
                            var toDate = moment(priceResData[i].promotionTo, 'MM/DD/YYYY HH:mm').add(1, 'days');
                            if (moment().isBetween(fromDate, toDate)) {
                                $scope.isPricingPromotion = priceResData[i].isPromotion = true;
                            }
                            priceResData[i].durationpercent = 5;
                        }
                        //Add img price-table Tiger-bui
                        if (datapage[svtype][$scope.nameSv] !== undefined) {
                            priceResData[i].pricetbimg = datapage[svtype][$scope.nameSv].pricetbimg;
                        }
                        else {
                            console.log('Tên ' + $scope.nameSv + ' trong tệp service api global chưa chính xác');
                        }
                        //Lấy giá ở gói A đẩy cho phần callToAction
                        if (priceResData[i].name === "Gói A" || priceResData[i].name === "Email Server") {
                            datapage[svtype][$scope.nameSv].prsvA = priceResData[i].priceOrigin;
                        }
                        addTooltipToPriceTable(priceResData[i]);
                    }
                    console.log(priceResData);
                    if (prtbdesdatamock[$scope.nameSv]) {
                        for (var e = 0; e < priceResData.length; e++) {
                            fn_addIconToPricePkName(e, prtbdesdatamock[$scope.nameSv][e]);
                        }
                    }
                    addDurationToPriceTable();
                    $scope.openMd = function (size, parentSelector) {
                        var parentElem = parentSelector ?
                            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            template: $templateCache.get('trial7day.html'),
                            controller: 'ModalTrialCtrl',
                            controllerAs: '$ctrl',
                            size: size,
                            appendTo: parentElem,
                            resolve: {
                                items: function () {
                                    return priceResData;
                                },
                                account: function () {
                                    return $scope.account;
                                }
                            }
                        });

                        modalInstance.result.then(function (selectedItem) {
                            $scope.selected = selectedItem;
                        }, function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });
                    };
                    if (document.URL.indexOf('#trial-popup') > 0) {
                        $scope.openMd();
                    }
                });
                $scope.featured = datapage[svtype];
                $scope.spcfFilter = svtype;
            }
        }

        function stopTime() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        }

        //Add tooltip vào bảng giá VPS => TigerBui
        function addTooltipToPriceTable(data) {
            if (data.name == 'Gói A' || data.name == 'Gói B') {
                return data.tooltip = 'Đăng ký từ 1 năm trở lên tặng DA. Áp dụng khi mua gói dịch vụ với giá gốc';
            }
            else {
                return data.tooltip = 'Đăng ký từ 3 tháng trở lên tặng cPanel. Áp dụng khi mua gói dịch vụ với giá gốc';
            }
        }
        $scope.durationSelected = {};
        //Demo chọn tháng Hosting và chiết khấu giá dịch vụ
        function addDurationToPriceTable() {
            $scope.durationData = [
                {
                    numberofm: 6,
                    durationpercent: 0
                },
                {
                    numberofm: 12,
                    durationpercent: 5
                },
                {
                    numberofm: 24,
                    durationpercent: 20
                },
                {
                    numberofm: 36,
                    durationpercent: 25
                },
                {
                    numberofm: 60,
                    durationpercent: 35
                }
            ];
            $scope.durationSelected = $scope.durationData[1];
        }

        $scope.selectDuration = function (dr) {
            $scope.durationSelected = dr;
            for(var i = 0; i < $scope.priceSvData.length; i++){
                $scope.priceSvData[i].durationpercent = dr.durationpercent;
            }
        };

        //Dịch vụ cộng thêm
        $scope.addedSv = [];
        $scope.svFeatureDataStr = {};
        $scope.svFeatureDataObj = [];
        var dataurl = [
            {
                url: "/hosting",
                prdata: "hosting",
                data: "hostingLinux"
            },
            {
                url: "/hosting/wordpress-hosting",
                prdata: "hosting",
                data: "hostingWJ"
            },
            {
                url: "/hosting/web-hosting",
                prdata: "hosting",
                data: "hostingWJ"
            },
            {
                url: "/hosting/seo-hosting",
                prdata: "hosting",
                data: "hostingSeo"
            },
            {
                url: "/hosting/reseller-hosting",
                prdata: "hosting",
                data: "hostingReseller"
            },
            {
                url: "/hosting/business-hosting",
                prdata: "hosting",
                data: "hostingEnterprise"
            },
            {
                url: "/email-theo-ten-mien",
                prdata: "email",
                data: "emailBusiness"
            },
            {
                url: "/email/big-mail",
                prdata: "email",
                data: "emailBig"
            },
            {
                url: "/email/email-server-rieng",
                prdata: "email",
                data: "emailServer"
            },
            {
                url: "/vps",
                data: "vps"
            },
            {
                url: "/ssl",
                data: "ssl"
            }
        ];
        //Hàm kiểm tra các trang landing page và lấy dữ liệu từ Api dịch vụ cộng thêm theo tên landing page
        function checurl() {
            var getdata = [];
            for (var i = 0; i < dataurl.length; i++) {
                if (dataurl[i].url == locationPath) {
                    if (dataurl[i].prdata == undefined) {
                        getdata.push(dataurl[i].data);
                    }
                    else {
                        getdata.push(dataurl[i].prdata, dataurl[i].data);
                    }
                }
            }
            if (getdata.length == 1) {
                serviceApiGlobal.addedServiceLandingPage().geturlapisvname(getdata[0]).then(function (response) {
                    fn_bindDataAddedSv(response.data.addservice);
                });
            }
            else if (getdata.length == 2) {
                serviceApiGlobal.addedServiceLandingPage().geturlapiparsvname(getdata[1], getdata[0]).then(function (response) {
                    fn_bindDataAddedSv(response.data.addservice);
                });
            }
            else {
                console.log(getdata + ' error!');
            }
        }

        checurl();
        //Hàm bind dữ liệu Dịch vụ cộng thêm đẩy vào landing page tương ứng
        function fn_bindDataAddedSv(data) {
            $scope.addedSv = data;
            for (var i = 0; i < data.length; i++) {
                fn_resellerFeatureData(i, data[i].svfeature);
            }
        }

        function fn_resellerFeatureData(index, data) {
            if (typeof data == "string") {
                $scope.svFeatureDataStr[index] = data;
            } else if (typeof data == "object") {
                $scope.svFeatureDataObj[index] = data;
            }
        }

        //Code landing page trên mobile
        $scope.isCollapsed = false;

        $scope.Math = window.Math;
        $scope.vpsCustomize = [
            {
                name: 'SSD Storage',
                key: 'storage',
                unit: 'GB',
                min: 20,
                max: 3000,
                price: 140000,
                step: 20,
                stepValue: 70000
            },
            {
                name: 'RAM',
                unit: 'GB',
                key: 'ram',
                min: 1,
                max: 32,
                price: 50000,
                step: 1,
                stepValue: 50000
            },
            {
                name: 'CPU',
                unit: 'Core',
                key: 'cpu',
                min: 1,
                max: 8,
                price: 50000,
                step: 1,
                stepValue: 50000
            },
            {
                name: 'IP',
                unit: 'IP',
                key: 'ip',
                min: 0,
                max: 20,
                price: 0,
                step: 0,
                stepValue: 100000
            },
            {
                name: 'Quản trị Server',
                unit: '',
                key: 'manageserver',
                min: 0,
                max: 1,
                price: 0,
                step: 0,
                stepValue: 1000000
            }
        ];

        $scope.totalPrice = 240000;
        $scope.changeStep = function (custom) {
            $scope.totalPrice = 0;
            custom.step = Math.ceil(custom.step);
            if (custom.step < custom.min) {
                custom.step = custom.min;
            }
            if (custom.step > custom.max) {
                custom.step = custom.max;
            }
            if (custom.name == 'SSD Storage') {
                if (custom.step % 10 == 1) {
                    custom.step = Math.ceil(custom.step / 10) * 10;
                } else if (custom.step % 10 == 9) {
                    custom.step = Math.floor(custom.step / 10) * 10;
                } else {
                    custom.step = Math.ceil(custom.step / 10) * 10;
                }
                custom.price = custom.step / 10 * custom.stepValue;
            } else if (custom.name == 'RAM' && custom.step <= 11) {
                custom.price = Math.round(custom.step * custom.stepValue * (1 + custom.step * 0.1 - 0.1));
            } else if (custom.name == 'RAM' && custom.step > 11) {
                custom.price = Math.round(custom.step * custom.stepValue * 2.1);
            } else if (custom.name == 'CPU') {
                custom.price = Math.round(custom.step * custom.stepValue * (1 + custom.step * 0.1 - 0.1));
            } else if (custom.name == 'IP' && custom.step <= 10) {
                custom.price = Math.round(custom.step * custom.stepValue * (1 - (custom.step - 1) * 0.05));
            } else if (custom.name == 'IP' && custom.step > 10) {
                custom.price = Math.round(custom.step * custom.stepValue * 0.55);
            } else {
                custom.price = Math.round(custom.step * custom.stepValue);
            }
            for (var i = 0; i < $scope.vpsCustomize.length; i++) {
                $scope.totalPrice += $scope.vpsCustomize[i].price;
            }
        };

        $scope.gotoBasket = function () {
            if ($scope.totalPrice > 0) {
                var order = [];
                var obj = {},
                    cartData = [];
                var d = new Date();
                obj.name = 'VPS-' + d.getTime();
                obj.serviceType = 'vps';
                obj.type = 'cloud-new';
                obj.planName = 'Gói Customize';
                obj.period = 12;
                for (var i = 0; i < $scope.vpsCustomize.length; i++) {
                    var item = '';
                    if ($scope.vpsCustomize[i].name == 'SSD Storage') {
                        item = $scope.vpsCustomize[i].key + ':' + $scope.vpsCustomize[i].step / 10;
                    } else {
                        item = $scope.vpsCustomize[i].key + ':' + $scope.vpsCustomize[i].step;
                    }
                    cartData.push(item);
                }
                obj.dataExtend = cartData.join(',');
                // alert(cartData);
                obj.proceed = 'add';
                obj.action = 'register';
                order.push(obj);
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.put('order', JSON.stringify(order), {'expires': expireDate, 'path': '/'});
                $window.location.href = '/cart/basket';
            } else {
                $scope.failureMessage = "Có lỗi xảy ra";
            }
        };
        // Price domain nam table
        var _getSuffix = undefined;
        $scope.fulldomainname = undefined;
        //Lấy ra danh sách đuôi tên miền hỗ trợ
        _getSuffix = whoisService.getSuffix().promise.then(function (response) {
            $scope.suffix = response.data;
            for (var i = 0; i < $scope.suffix.length; i++) {
                if ($scope.suffix[i].type === 'vn') {
                    $scope.typeExtesVn = "vn";
                } else if ($scope.suffix[i].type === 'global') {
                    $scope.typeExtesGlobal = "global";
                } else if ($scope.suffix[i].type === 'extend') {
                    $scope.typeExtesExtend = "extend";
                }
            }
        });
        $scope.dataJson = {
            vn: 10,
            global: 10,
            extend: 10
        };
        //Set default limito
        $scope.vnLimit = $scope.dataJson.vn;
        $scope.globalLimit = $scope.dataJson.global;
        $scope.extendLimit = $scope.dataJson.extend;
        //Ham xem het cac duoi
        $scope.viewAll = function (extesType) {
            if (extesType === 'vn') {
                $scope.vnLimit = !$scope.vnLimit;
            } else if (extesType === 'global') {
                $scope.globalLimit = !$scope.globalLimit;
            } else if (extesType === 'extend') {
                $scope.extendLimit = !$scope.extendLimit;
            }
        };
        //Ham dua ve default
        $scope.viewDefault = function (extesType) {
            if (extesType === 'vn') {
                $scope.vnLimit = $scope.dataJson.vn;
            } else if (extesType === 'global') {
                $scope.globalLimit = $scope.dataJson.global;
            } else if (extesType === 'extend') {
                $scope.extendLimit = $scope.dataJson.extend;
            }
        };
        //Ham gan duoi ten mien vao o search
        $scope.getExtesDmn = function (extesDmn) {
            $scope.selected = extesDmn;
            $scope.focusThis = true;
        };
        $scope.removeExtesDmn = function () {
            $scope.selected = "";
            $scope.focusThis = false;
        };
        //Click submit form
        $scope.submitform = function () {
            if ($scope.selected) {
                $scope.query = $scope.query + '.' + $scope.selected;
            }
        };
    }

    app.controller("domainLockCtrl", domainLockCtrl);

    domainLockCtrl.$inject = ['$scope', '$http', '$cookies', '$window'];

    function domainLockCtrl($scope, $http, $cookies, $window) {
        $scope.domain = false;
        $scope.whois = function () {
            $scope.locked = false;
            $scope.isInet = false;
            $http.get('/api/whois/' + $scope.query).success(function (res) {
                $scope.domain = res;
                if ($scope.domain.code == '1') {
                    $scope.registed = false;
                } else {
                    $scope.registed = true;
                    for (var i = 0; i < $scope.domain.status.length; i++) {
                        if ($scope.domain.status[i].indexOf('server') > -1) {
                            $scope.locked = true;
                        }
                    }
                    if ($scope.domain.registrar.toLowerCase().indexOf('inet') > -1) {
                        $scope.isInet = true;
                    } else {
                        $scope.isInet = false;
                    }
                }
            });
        };

        $scope.lockDomain = function () {
            var order = [];
            var obj = {};
            obj.name = $scope.domain.domainName;
            obj.serviceType = 'domain';
            obj.period = 12;
            obj.action = 'registry-lock';
            obj.proceed = 'add';
            order.push(obj);

            if (!$scope.isInet) {
                var objTransfer = {};
                objTransfer.domainName = $scope.domain.domainName;
                objTransfer.serviceType = 'domain';
                objTransfer.period = 1;
                objTransfer.action = 'transfer';
                objTransfer.proceed = 'add';
                order.push(objTransfer);
            }
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('order', JSON.stringify(order), {'expires': expireDate, 'path': '/'});
            $window.location.href = "/cart/basket";
        }
    }

    app.controller("domainDNSSECCtrl", domainDNSSECCtrl);

    domainDNSSECCtrl.$inject = ['$scope', '$http', '$cookies', '$window'];

    function domainDNSSECCtrl($scope, $http, $cookies, $window) {
        $scope.domain = false;
        $scope.whois = function () {
            $scope.dnssec = false;
            $scope.isInet = false;
            $http.get('/api/whois/' + $scope.query).success(function (res) {
                $scope.domain = res;
                if ($scope.domain.code == '1') {
                    $scope.registed = false;
                } else {
                    $scope.registed = true;
                    if ($scope.domain.DNSSEC == 'signedDelegation') {
                        $scope.dnssec = true;
                    }
                    if ($scope.domain.registrar.toLowerCase().indexOf('inet') > -1) {
                        $scope.isInet = true;
                    } else {
                        $scope.isInet = false;
                    }
                }
            });
        };

        $scope.addDNSSEC = function () {
            var order = [];
            var obj = {};
            obj.name = $scope.domain.domainName;
            obj.serviceType = 'domain';
            obj.period = 1;
            obj.action = 'dnssec';
            obj.proceed = 'add';
            order.push(obj);

            if (!$scope.isInet) {
                var objTransfer = {};
                objTransfer.name = $scope.domain.domainName;
                objTransfer.serviceType = 'domain';
                objTransfer.period = 1;
                objTransfer.action = 'transfer';
                objTransfer.proceed = 'add';
                order.push(objTransfer);
            }
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('order', JSON.stringify(order), {'expires': expireDate, 'path': '/'});
            $window.location.href = "/cart/basket";
        }
    }

    app.controller("domainTransfersCtrl", domainTransfersCtrl);

    domainTransfersCtrl.$inject = ['$scope', '$http', '$cookies', '$window', 'moment'];

    function domainTransfersCtrl($scope, $http, $cookies, $window, moment) {
        $scope.domain = false;
        $scope.whois = function () {
            $http.get('/api/whois/' + $scope.query).success(function (res) {
                $scope.added = false;
                $scope.domain = res;
                if ($scope.domain.code == '1') {
                    $scope.registed = false;
                } else {
                    $scope.registed = true;
                    for (var i = 0; i < $scope.domain.status.length; i++) {
                        if ($scope.domain.status[i] == 'ok') {
                            $scope.transferStatus = 'ok';
                            break;
                        } else if ($scope.domain.status[i] == 'clienttransferprohibited') {
                            $scope.transferStatus = 'clienttransferprohibited';
                            break;
                        }
                    }
                    if ($cookies.get('order') != undefined) {
                        var orderCookies = JSON.parse($cookies.get('order'));
                        for (var i = 0; i < orderCookies.length; i++) {
                            if (orderCookies[i].domainName == $scope.domain.domainName) {
                                $scope.added = true;
                            }
                        }
                    }
                }
            });
        };

        $scope.addToCart = function () {
            if ($scope.domain.authCode == undefined || $scope.domain.authCode == '') {
                return;
            }
            var order = [];
            if ($cookies.get('order') != undefined) {
                var orderCookies = JSON.parse($cookies.get('order'));
                var order = orderCookies;
                for (var i = 0; i < orderCookies.length; i++) {
                    if (orderCookies[i].domainName == $scope.domain.domainName) {
                        return;
                    }
                }
            }
            var obj = {};
            obj.name = $scope.domain.domainName;
            obj.serviceType = 'domain';
            obj.period = 1;
            obj.action = 'transfer';
            obj.proceed = 'add';
            obj.dataExtend = JSON.stringify({authCode: $scope.domain.authCode});
            order.push(obj);
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('order', JSON.stringify(order), {'expires': expireDate, 'path': '/'});
            $scope.added = true;
        };

        $scope.goToCart = function () {
            $window.location.href = '/cart/basket';
        };

        $scope.focusInputSearch = function () {
            angular.element(document.querySelector('#ipSearchDomain')).focus();
        }
    }

    app.controller("registrantTransferCtrl", registrantTransferCtrl);

    registrantTransferCtrl.$inject = ['$scope', '$http', '$cookies', '$window'];

    function registrantTransferCtrl($scope, $http, $cookies, $window) {
        $scope.domain = false;
        $scope.whois = function () {
            $scope.isInet = false;
            $http.get('/api/whois/' + $scope.query).success(function (res) {
                $scope.domain = res;
                if ($scope.domain.code == '1') {
                    $scope.registed = false;
                } else {
                    $scope.registed = true;
                    if ($scope.domain.registrar.toLowerCase().indexOf('inet') > -1) {
                        $scope.isInet = true;
                    } else {
                        $scope.isInet = false;
                    }
                }
            });
        };

        $scope.transfer = function () {
            var order = [];
            var obj = {};
            obj.name = $scope.domain.domainName;
            obj.serviceType = 'domain';
            obj.period = 1;
            obj.action = 'change-registrant';
            obj.proceed = 'add';
            order.push(obj);

            if (!$scope.isInet) {
                var objTransfer = {};
                objTransfer.domainName = $scope.domain.domainName;
                objTransfer.serviceType = 'domain';
                objTransfer.period = 1;
                objTransfer.action = 'transfer';
                objTransfer.proceed = 'add';
                order.push(objTransfer);
            }
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.put('order', JSON.stringify(order), {'expires': expireDate, 'path': '/'});
            $window.location.href = "/cart/basket";
        }
    }

    app.controller("subscriptionCtrl", subscriptionCtrl);

    subscriptionCtrl.$inject = ['$scope', '$http', '$cookies', '$window', 'serviceApiGlobal'];

    function subscriptionCtrl($scope, $http, $cookies, $window, serviceApiGlobal) {
        $scope.email = serviceApiGlobal.getParams('email');
        $scope.subscription = function () {
            var customer = {
                fullname: $scope.fullname,
                email: $scope.email,
                phone: $scope.phone
            };
            $http.post('/api/crm/subscription', JSON.stringify(customer), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                $scope.customer = data;
            });
        }
    }

    app.controller('ModalTrialCtrl', function ($uibModalInstance, $http, items, account) {
        var $ctrl = this;
        $ctrl.items = items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].name == 'Gói A') {
                $ctrl.selected = items[i];
            }
        }
        $ctrl.serviceType = $ctrl.selected.serviceType;
        $ctrl.success = false;
        if (account.email) {
            $ctrl.email = account.email;
            $ctrl.fullname = account.fullname;
            $ctrl.phone = account.phone;
        }
        $ctrl.registerTrial = function () {
            if ($ctrl.fullname == undefined || $ctrl.fullname == '') {
                $ctrl.status = 'error';
                $ctrl.message = 'Thiếu trường tên';
                return;
            }
            if ($ctrl.email == undefined || $ctrl.email == '') {
                $ctrl.status = 'error';
                $ctrl.message = 'Thiếu trường email';
                return;
            }
            if ($ctrl.phone == undefined || $ctrl.phone == '') {
                $ctrl.status = 'error';
                $ctrl.message = 'Thiếu trường điện thoại';
                return;
            }
            if ($ctrl.domainName == undefined || $ctrl.domainName == '') {
                $ctrl.status = 'error';
                $ctrl.message = 'Thiếu trường tên miền';
                return;
            }
            if (!CheckIsValidDomain($ctrl.domainName)) {
                $ctrl.status = 'error';
                $ctrl.message = 'Tên miền không chính xác';
                return;
            }
            if ($ctrl.place == undefined || $ctrl.place == '') {
                $ctrl.status = 'error';
                $ctrl.message = 'Vui lòng khu vực để được hỗ trợ tốt nhất';
                return;
            }
            var params = {
                domainName: $ctrl.domainName, fullname: $ctrl.fullname, email: $ctrl.email, phone: $ctrl.phone,
                planId: $ctrl.selected.id, type: $ctrl.selected.type, place: $ctrl.place
            };
            $ctrl.loading = true;
            $http.post('/api/' + $ctrl.serviceType + '/trialwaiting', JSON.stringify(params), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                if (data.id != undefined) {
                    $ctrl.status = 'success';
                } else {
                    $ctrl.status = 'error';
                    $ctrl.message = data.message;
                }
                $ctrl.loading = false;
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function CheckIsValidDomain(domain) {
            var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
            return domain.match(re);
        }
    });

    //Demo directive add colspan vào td trong table, hiện tại hàm này viêt chưa được hoàn chỉnh và chưa tự động
    app.directive('mergeTable', mergeTable);

    mergeTable.$inject = ['$timeout'];
    function mergeTable($timeout) {
        return {
            restrict: 'AE',
            link: function (scope, elemt, attr) {
                $timeout(function () {
                    angular.forEach(elemt, function (dt) {
                        var currentText = $(dt).text();
                        if (currentText.indexOf('KVM') > -1 || currentText.indexOf('Stop, Start, Reload, Install OS') > -1 || currentText.indexOf('Chủ động thao tác') > -1) {
                            var findTd = $(dt.parentElement).find('td');
                            for (var i = 1; i < findTd.length; i++) {
                                if (i == 1) {
                                    findTd[i].setAttribute('colspan', findTd.length);
                                }
                                else {
                                    findTd[i].remove();
                                }
                            }
                        }
                    })
                }, 350);
            }
        }
    }

})();