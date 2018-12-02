(function () {
    "use strict";
    var app = angular.module('agencyRegisterApp', ['ui.bootstrap', 'serviceApiGlobalApp', 'translateApp', 'directiveGlobalApp']);
    app.controller('agencyRegisterCtrl', agencyRegisterCtrl);
    
    function agencyRegisterCtrl($scope, $rootScope, $http, $window, serviceApiGlobal, icrmNotification) {

        $scope.renderHtml = function (html) {
            return serviceApiGlobal.renderHtml(html);
        };

        $scope.organization = {};
        $scope.register = function(){
            if($scope.organization.name == undefined || $scope.organization.name == ''){
                icrmNotification.error("Vui lòng nhập thông tin họ tên đầy đủ");
                $scope.success = false;
                return;
            }
            if($scope.organization.email == undefined || $scope.organization.email == ''){
                icrmNotification.error("Vui lòng nhập thông tin email");
                $scope.success = false;
                return;
            }
            if($scope.organization.phone == undefined || $scope.organization.phone == ''){
                icrmNotification.error("Vui lòng nhập thông tin số điện thoại");
                $scope.success = false;
                return;
            }
            if($scope.organization.address == undefined || $scope.organization.address == ''){
                icrmNotification.error("Vui lòng nhập thông tin địa chỉ");
                $scope.success = false;
                return;
            }
            $scope.loading = true;
            $http.post('/api/organization/register', JSON.stringify($scope.organization), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function(data) {
                $scope.loading = false;
                $rootScope.$broadcast('showLoading', {
                    scope : $scope
                });
                if(data.id != undefined){
                    $http.post('/api/notification/push', JSON.stringify({template: 'organizationonline'}),
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (dataPush) {
                    });
                    $window.location.href = '/dang-ky-dai-ly-thanh-cong';
                } else {
                    icrmNotification.error("Có lỗi xảy ra khi tạo mới đại lý");
                    $scope.success = false;
                }
            });
        };


        $scope.agencyFtData = [
            {
                title: 'Cung cấp DMS quản lý khách hàng riêng'
            },
            {
                title: 'Toàn quyền quyết định kích hoạt Dịch vụ tại bất kỳ thời điểm nào'
            },
            {
                title: 'Hưởng chiết khấu trực tiếp khi đăng ký dịch vụ'
            },
            {
                title: 'Ký quỹ chỉ từ 1.000.000 đ chỉ có tại iNET'
            },
            {
                title: 'Tư vấn tận tâm và hỗ trợ 24/7/365 - Bạn cần là có'
            },
            {
                title: 'Liên tục có chương trình khuyến mại đặc biệt dành riêng cho Đại lý'
            }
        ];
        //Bảng giá đại lý Cập nhật 14/7/2018
        var groupThead = [
            {
                name: 'durationRegister', title: 'Thời gian đăng ký'
            },
            {
                name: 'affiliate', title: 'Khách lẻ'
            },
            {
                name: 'agency1', title: 'Đại lý cấp 1'
            },
            {
                name: 'agency2', title: 'Đại lý cấp 2'
            },
            {
                name: 'agency3', title: 'Đại lý cấp 3'
            },
            {
                name: 'agency4', title: 'Đại lý cấp 4'
            }
        ];
        var priceTableHostingEmail = {
            column: groupThead,
            rows: [
                {
                    durationRegister: 6,
                    affiliate: 0,
                    agency1: 15,
                    agency2: 20,
                    agency3: 25,
                    agency4: 30
                },
                {
                    durationRegister: 12,
                    affiliate: 5,
                    agency1: 15,
                    agency2: 20,
                    agency3: 25,
                    agency4: 30
                },
                {
                    durationRegister: 24,
                    affiliate: 20,
                    agency1: 25,
                    agency2: 30,
                    agency3: 35,
                    agency4: 40
                },
                {
                    durationRegister: 36,
                    affiliate: 25,
                    agency1: 30,
                    agency2: 35,
                    agency3: 40,
                    agency4: 45
                },
                {
                    durationRegister: 60,
                    affiliate: 35,
                    agency1: 40,
                    agency2: 45,
                    agency3: 50,
                    agency4: 55
                }
            ]
        };
        $scope.dataHostingEmail = priceTableHostingEmail;
        var priceTableCloudVpsEmailServer = {
            column: groupThead,
            rows: [
                {
                    durationRegister: 3,
                    affiliate: 5,
                    agency1: 15,
                    agency2: 20,
                    agency3: 22,
                    agency4: 25
                },
                {
                    durationRegister: 6,
                    affiliate: 10,
                    agency1: 15,
                    agency2: 20,
                    agency3: 22,
                    agency4: 25
                },
                {
                    durationRegister: 12,
                    affiliate: 20,
                    agency1: 22,
                    agency2: 25,
                    agency3: 27,
                    agency4: 30
                },
                {
                    durationRegister: 24,
                    affiliate: 25,
                    agency1: 27,
                    agency2: 30,
                    agency3: 35,
                    agency4: 40
                },
                {
                    durationRegister: 36,
                    affiliate: 30,
                    agency1: 32,
                    agency2: 35,
                    agency3: 40,
                    agency4: 45
                }
            ]
        };
        $scope.dataCloudVpsEmailServer = priceTableCloudVpsEmailServer;
        var priceTableWebsite = {
            column: [
                {
                    name: 'agencylevel', title: 'Cấp đại lý'
                },
                {
                    name: 'affiliate', title: 'Cộng tác viên (Z = 0 triệu đồng)'
                },
                {
                    name: 'agency', title: 'Đại lý (Z >= 1 triệu đồng)'
                },
                {
                    name: 'partner', title: 'Đối tác (Z >= 10 triệu đồng)'
                }
            ],
            rows: [
                {
                    agencylevel: 'Đăng ký mới',
                    affiliate: '20%',
                    agency: '25%',
                    partner: '50%'
                },
                {
                    agencylevel: 'Gia hạn',
                    affiliate: 0,
                    agency: '25%',
                    partner: '50%'
                }
            ]
        };
        $scope.dataWebsite = priceTableWebsite;
        var priceTableDomainGlobal = {
            column: [
                {
                    name: 'agencylevel', title: 'Cấp đại lý'
                },
                {
                    name: 'affiliate', title: 'Khách lẻ'
                },
                {
                    name: 'agency1', title: 'Đại lý cấp 1'
                },
                {
                    name: 'agency2', title: 'Đại lý cấp 2'
                },
                {
                    name: 'agency3', title: 'Đại lý cấp 3'
                },
                {
                    name: 'agency4', title: 'Đại lý cấp 4'
                }
            ],
            rows: [
                {
                    agencylevel: '.com',
                    affiliate: 280000,
                    agency1: 241000,
                    agency2: 235000,
                    agency3: 231000,
                    agency4: 208000
                },
                {
                    agencylevel: '.net',
                    affiliate: 300000,
                    agency1: 295000,
                    agency2: 290000,
                    agency3: 285000,
                    agency4: 247000
                },
                {
                    agencylevel: '.org',
                    affiliate: 310000,
                    agency1: 303000,
                    agency2: 295000,
                    agency3: 290000,
                    agency4: 261000
                },
                {
                    agencylevel: '.biz',
                    affiliate: 320000,
                    agency1: 267000,
                    agency2: 260000,
                    agency3: 255000,
                    agency4: 252000
                },
                {
                    agencylevel: '.info',
                    affiliate: 310000,
                    agency1: 298000,
                    agency2: 290000,
                    agency3: 285000,
                    agency4: 257000
                },
                {
                    agencylevel: '.mobi',
                    affiliate: 450000,
                    agency1: 425000,
                    agency2: 414000,
                    agency3: 406000,
                    agency4: 395000
                },
                {
                    agencylevel: '.asia',
                    affiliate: 450000,
                    agency1: 368000,
                    agency2: 358000,
                    agency3: 352000,
                    agency4: 342000
                },
                {
                    agencylevel: '.eu',
                    affiliate: 270000,
                    agency1: 254000,
                    agency2: 247000,
                    agency3: 243000,
                    agency4: 237000
                },
                {
                    agencylevel: '.com.co | .net.co | .nom.co',
                    affiliate: 820000,
                    agency1: 764000,
                    agency2: 745000,
                    agency3: 731000,
                    agency4: 712000
                },
                {
                    agencylevel: '.top',
                    affiliate: 390000,
                    agency1: 368000,
                    agency2: 358000,
                    agency3: 352000,
                    agency4: 342000
                },
                {
                    agencylevel: '.shop',
                    affiliate: 830000,
                    agency1: 847000,
                    agency2: 825000,
                    agency3: 810000,
                    agency4: 788000
                },
                {
                    agencylevel: '.website',
                    affiliate: 510000,
                    agency1: 481000,
                    agency2: 469000,
                    agency3: 465000,
                    agency4: 448000
                },
                {
                    agencylevel:'.land',
                    affiliate: 710000,
                    agency1: 668000,
                    agency2: 651000,
                    agency3: 639000,
                    agency4: 622000
                },
                {
                    agencylevel: '.blog',
                    affiliate: 740000,
                    agency1: 696000,
                    agency2: 678000,
                    agency3: 666000,
                    agency4: 648000
                },
                {
                    agencylevel: '.co.in | .net.in | .org.in | .firm.in',
                    affiliate: 200000,
                    agency1: 198000,
                    agency2: 197000,
                    agency3: 196000,
                    agency4: 193000
                }
            ]
        };

        $scope.dataDomainGlobal = priceTableDomainGlobal;
    }
})();
