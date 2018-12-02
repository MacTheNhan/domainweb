'use strict';
var serviceApp = angular.module("serviceApiGlobalApp", ['sslServiceModule']);

serviceApp.factory("serviceApiGlobal", apiServiceFactory);

apiServiceFactory.$inject = [
    '$http', '$q', '$timeout', '$sce'
];

function apiServiceFactory ($http, $q, $timeout, $sce) {
    return {
        basicService: function(){
            var deferred = $q.defer();

            var promise = $http({method: 'GET', url: '/api/service/basic-list', timeout: deferred.promise})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(status){
                    deferred.reject(status);
                });
            return {
                promise: promise
            };
        },
        domainSpeciyResult: function (data) {
            if(data.code == 0) {
                return {
                    available: false,
                    msg: "Tên miền đã có người đăng ký"
                }
            }
            else if(data.code == 1) {
                return {
                    available: true,
                    msg: "Tên miền có thể đăng ký"
                }
            }
            else if(data.code == 3){
                return {
                    available: false,
                    msg: "Không hỗ trợ đuôi tên miền này"
                }
            }
            else if (data.code == 4) {
                return {
                    available: false,
                    msg: "Là đuôi tên miền .vn cấp hai chưa được cấp phép"
                }
            }
            else if(data.code == 5) {
                return {
                    available: false,
                    msg: "Là tên miền đặc biệt, vui lòng liên hệ với iNET để đăng ký"
                }
            }
            else {
                return {
                    available: false,
                    msg: "Trường hợp này vui lòng liên hệ với iNET để làm rõ!"
                }
            }
        },
        valueAddedService: function() {
            var deferred = $q.defer();

            var promise = $http({method: 'GET', url: '/api/service/value-added-list', timeout: deferred.promise})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(status){
                    deferred.reject(status);
                });
            return {
                promise: promise
            };
        },
        topDomainService: function() {
            var deferred = $q.defer();

            var promise = $http({method: 'GET', url: '/api/service/top-domain-list', timeout: deferred.promise})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(status){
                    deferred.reject(status);
                });
            return {
                promise: promise
            };
        },
        websiteThemes: function() {
            var deferred = $q.defer();

            var promise = $http({method: 'GET', url: '/api/website/theme', timeout: deferred.promise})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(status){
                    deferred.reject(status);
                });
            return {
                promise: promise
            };
        },
        packageList: function(svtype, type) {
            var deferred = $q.defer();

            var promise = $http({method: 'GET', url: '/api/package/list/'+ svtype +'/'+type, timeout: deferred.promise})
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(status){
                    deferred.reject(status);
                });

            return {
                promise: promise
            };
        },
        addedServiceLandingPage: function() {
            var deferred = $q.defer(),
                ldPUrlApi = "/api/added/service/";

            var geturlapisvname = function(mainsv) {
                    return($http({method: 'GET', url: ldPUrlApi + mainsv}).success(handlerSuccess).error(handlerError));
                },
                geturlapiparsvname = function(parsv, subsv) {
                    return($http({method: 'GET', url: ldPUrlApi + subsv + '/' + parsv}).success(handlerSuccess).error(handlerError));
                };

            function handlerSuccess(data) {
                return deferred.resolve(data);
            };

            function handlerError(status) {
                return deferred.reject(status);
            };

            return {
                geturlapisvname: geturlapisvname,
                geturlapiparsvname: geturlapiparsvname
            };
        },
        bankList: function() {
            var deferred = $q.defer(),
                ldPUrlApi = "/api/category/banklist";

            var getBankList = function() {
                return($http({method: 'GET', url: ldPUrlApi}).success(handlerSuccess).error(handlerError));
            };

            function handlerSuccess(data) {
                return deferred.resolve(data);
            }

            function handlerError(status) {
                return deferred.reject(status);
            }

            return {
                getBankList: getBankList
            };
        },
        backOrder: function() {
            var deferred = $q.defer(),
                ldPUrlApi = "/api/backorder";

            var getBO = function() {
                return($http({method: 'GET', url: ldPUrlApi}).success(handlerSuccess).error(handlerError));
            };

            function handlerSuccess(data) {
                return deferred.resolve(data);
            };

            function handlerError(status) {
                return deferred.reject(status);
            };

            return {
                getBO: getBO
            };
        },
        dhms: function (t) {
            var days, hours, minutes, seconds;
            var coundown = {};
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            coundown.day = days;
            coundown.hour = hours;
            coundown.minute = minutes;
            coundown.second = seconds;
            return coundown;
        },
        campaignBanner: function () {
            var deferred = $q.defer(),
                ldPUrlApi = "/api/campaign/banner";

            return($http({method: 'GET', url: ldPUrlApi}).success(handlerSuccess).error(handlerError));

            function handlerSuccess(data) {
                return deferred.resolve(data);
            };

            function handlerError(status) {
                return deferred.reject(status);
            };
        },
        detectMobile: function () {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return !check;
        },
        getParams: function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        customerReview: function () {
            var dataMock = [
                {
                    name: "Nguyễn Khánh - CEO Microads",
                    des: "Hỗ trợ và tư vấn Hosting của iNET rất chuyên nghiệp, nhiều hôm 1, 2 giờ đêm các bạn vẫn còn hỗ trợ. Cảm thấy rất yên tâm khi sử dụng dịch vụ của iNET.",
                    avatar: "/public/img/avatar/nguyen-khanh.jpg",
                    bfname: "Mr",
                    urlprf: 'https://www.facebook.com/paybankvn'
                },
                {
                    name: "Nguyễn Bá Toàn - CEO Tư vấn phát triển sức khỏe VN",
                    des: "Mấy năm nay tôi sử dụng Hosting tại đây và rất yên tâm, iNET có nhiều chính sách chăm sóc khách hàng rất tốt, giá cả luôn hợp lý. Ủng hộ iNET.",
                    avatar: "/public/img/avatar/nguyen-ba-toan.jpg",
                    bfname: "Mr",
                    urlprf: 'http://cakholangvudai.com'
                },
                {
                    name: "Hồ Quang Dũng - Giám đốc ACB",
                    des: "Điểm 10 cho thái độ chăm sóc khách hàng của các bạn. Tôi sẽ tiếp tục ủng hộ và giới thiệu bạn bè sử dụng dịch vụ.",
                    avatar: "/public/img/avatar/ho-quang-dung.jpg",
                    bfname: "Mr",
                    urlprf: 'http://tuvanthueacb.com'
                },
                {
                    name: "Nguyễn Tình",
                    des: "Rất hài lòng về chất lượng dịch vụ của iNET. Các bạn hỗ trợ rất nhiệt tình.",
                    avatar: "/public/img/avatar/le-my-nguyen.jpg",
                    bfname: "Mr",
                    urlprf: 'http://www.tinhmarketingonline.com'
                }
            ];
            return dataMock;
        },
        saleSuport: function () {
            var dataMock = [
                {
                    name: "Nguyễn Việt Bắc",
                    imglink: "http://workshop.inet.vn/wp-content/uploads/2016/03/bacnv.jpg",
                    phone: "0904 885 057"
                },
                {
                    name: "Lê Minh Quân",
                    imglink: "http://workshop.inet.vn/wp-content/uploads/2016/03/Quan-2.jpg",
                    phone: "0904 885 095"
                },
                {
                    name: "Phạm Đức Việt",
                    imglink: "https://tintuc.inet.vn/wp-content/uploads/2016/07/viet-e1468225801927.jpg",
                    phone: "0904 766 690"
                },
                {
                    name: "Nguyễn Văn Dân",
                    imglink: "https://tintuc.inet.vn/wp-content/uploads/2016/07/dan-e1468225715815.jpg",
                    phone: "093 61 333 16"
                },
                {
                    name: "Đỗ Đại Dương",
                    imglink: "https://tintuc.inet.vn/wp-content/uploads/2016/07/duong.jpg",
                    phone: "0904 885 096"
                },
                {
                    name: "Trần Huy Dân",
                    imglink: "/public/img/avatar/dan.png",
                    phone: "090 489 7705"
                }
            ];
            return dataMock;
        },
        renderHtml: function (html) {
            return $sce.trustAsHtml(html);
        },
        couponsPackageSv: function (namePk, type, svtype, icon) {
            var packageList = [
                {
                    name: "Gói A",
                    domain: {
                        name: "Tên miền",
                        icon: "icon in-domain-name-1"
                    },
                    svname: {
                        name: namePk,
                        icon: icon
                    },
                    save: 20,
                    servicetype: type,
                    typename: svtype
                },
                {
                    name: "Gói B",
                    domain: {
                        name: "Tên miền",
                        icon: "icon in-domain-name-1"
                    },
                    svname: {
                        name: namePk,
                        icon: icon
                    },
                    save: 25,
                    servicetype: type,
                    typename: svtype
                },
                {
                    name: "Gói C",
                    domain: {
                        name: "Tên miền",
                        icon: "icon in-domain-name-1"
                    },
                    svname: {
                        name: namePk,
                        icon: icon
                    },
                    save: 30,
                    servicetype: type,
                    typename: svtype
                },
                {
                    name: "Gói D",
                    domain: {
                        name: "Tên miền",
                        icon: "icon in-domain-name-1"
                    },
                    svname: {
                        name: namePk,
                        icon: icon
                    },
                    save: 35,
                    servicetype: type,
                    typename: svtype
                },
                {
                    name: "Gói E",
                    domain: {
                        name: "Tên miền",
                        icon: "icon in-domain-name-1"
                    },
                    svname: {
                        name: namePk,
                        icon: icon
                    },
                    save: 40,
                    servicetype: type,
                    typename: svtype
                }
            ];
            return packageList;
        },
        offSetTop: function (id) {
            $('html, body').animate({scrollTop: $(id).offset().top}, 'slow');
        },
        monthDiff: function (d1, d2) {
            var months,
                dd1 = new Date(d1),
                dd2 = new Date(d2);
            months = (dd2.getFullYear() - dd1.getFullYear()) * 12;
            months -= dd1.getMonth() + 1;
            months += dd2.getMonth();
            return months <= 0 ? 1 : months + 1;
        },
        ldPagePackageInfo: function () {
            var datamock = {
                'linux': {
                    title: "Linux hosting",
                    imgurl: '/img/coupon/seo_hosting_thumbnail.jpg',
                    desc: [
                        'Máy chủ vật lý sử dụng ổ cứng SSD cho tốc độ xử lý website vượt trội so với hệ thống thông thường',
                        'Hỗ trợ nhiều phiên bản PHP từ 5.1 đến 7.0 có thể tùy biến thay đổi để phù hợp với website của bạn',
                        'Hosting đạt các tiêu chuẩn tính điểm PageSpeed Insights của Google.',
                        'Hỗ trợ miễn phí chuyển dữ liệu về hosting tại iNET'
                    ]
                },
                'seo': {
                    title: "SEO HOSTING",
                    imgurl: '/img/coupon/seo_hosting_thumbnail.jpg',
                    desc: [
                        'Cho phép chạy nhiều website khác địa chỉ IP',
                        'Mỗi website có 1 địa chỉ IP riêng biệt sẽ giúp các liên kết giữa các website trở nên uy tín hơn trong quá trình làm SEO, từ đó hỗ trợ tối ưu và nâng cao thứ hạng website trên các công cụ tìm kiếm thông dụng thế giới như Google, Yahoo, Bing,...',
                        'Hỗ trợ nhiều phiên bản PHP từ 5.1 đến 7.0 có thể tùy biến thay đổi để phù hợp với website của bạn',
                        'Bảo mật cao - Chống virus và hack website hiệu quả'
                    ]
                },
                'reseller': {
                    title: "RESELLER HOSTING",
                    imgurl: '/img/coupon/seo_hosting_thumbnail.jpg',
                    desc: [
                        'Cung cấp gói giải pháp Reseller hosting sử dụng nhiều địa chỉ IP trên các CLASS C khác nhau.',
                        'Mỗi tài khoản Hosting được gán một địa chỉ IP riêng biệt khác class C, hình thành  một hệ thống kênh vệ tinh phong phú , đa dạng, vượt qua các thuật toán khắt khe nhất của Google,Yahoo, Bing,…',
                        'Có thể chủ động gán hoặc thay đổi IP mong muốn cho từng website với công cụ iNET SEO IP Manager',
                        'Duy nhất chỉ có tại iNET – Ở Việt Nam chúng tôi đi tiên phong trong việc hỗ trợ giải pháp SEO IP hiệu quả cho doanh nghiệp'
                    ]
                },
                'cloudnew': {
                    title: "Cloud VPS",
                    imgurl: '/img/coupon/vps_thumbnail.jpg',
                    desc: [
                        'Mỗi máy chủ là một hệ thống hoàn toàn riêng biệt được cài hệ điều hành riêng và bạn có toàn quyền quản lý',
                        'Hạn chế 100% khả năng bị tấn công hack local',
                        'Có thể quản trị từ xa bằng Remote Desktop hoặc SSH, cài đặt các ứng dụng quản trị doanh nghiệp',
                        'CRM, quản lý khách hàng, bán hàng trực tuyến…',
                        'Dễ dàng nâng cấp tài nguyên bất cứ lúc nào'
                    ]
                },
                'email business': {
                    title: "Email",
                    imgurl: '/img/coupon/email_thumbnail.jpg',
                    desc: [
                        'Cung cấp gói giải pháp email theo Tên miền cho các doanh nghiệp, cá nhân sử dụng thư điện tử trong hoạt động quản lý, giao dịch với độ bảo mật dữ liệu cao',
                        'Tốc độ đường truyền ổn định, nhanh chóng, đặc biệt tránh sự cố đường truyền quốc tế',
                        'Khẳng định thương hiệu - uy tín - chuyên nghiệp trong giao dịch và quảng bá doanh nghiệp'
                    ]
                }
            };
            return datamock;
        }
    }
}