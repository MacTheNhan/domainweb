(function () {
    "use strict";
    angular.module('sslServiceModule', [])
        .factory('sslService', sslService);

    sslService.$inject = ['$filter'];
    
    function sslService($filter) {
        var data = {
            geotrust: {
                title: "SSL",
                des: "là viết tắt của từ Secure Sockets Layer, là tiêu chuẩn của công nghệ bảo mật, truyền thông mã hoá giữa máy chủ Web server và trình duyệt (browser). Tiêu chuẩn này hoạt động và đảm bảo rằng các dữ liệu truyền tải giữa máy chủ và trình duyệt của người dùng đều riêng tư và toàn vẹn. SSL hiện tại cũng là tiêu chuẩn bảo mật cho hàng triệu website trên toàn thế giới, nó bảo vệ dữ liệu truyền đi trên môi trường internet được an toàn.",
                img: "/public/img/banners/reseller-hosting-ldp-inet-service.png",
                pricetbimg: "/public/img/icons/vps-price-table.svg"
            },
            sslcomodo: {
                title: "SSL",
                des: "là viết tắt của từ Secure Sockets Layer, là tiêu chuẩn của công nghệ bảo mật, truyền thông mã hoá giữa máy chủ Web server và trình duyệt (browser). Tiêu chuẩn này hoạt động và đảm bảo rằng các dữ liệu truyền tải giữa máy chủ và trình duyệt của người dùng đều riêng tư và toàn vẹn. SSL hiện tại cũng là tiêu chuẩn bảo mật cho hàng triệu website trên toàn thế giới, nó bảo vệ dữ liệu truyền đi trên môi trường internet được an toàn.",
                img: "/public/img/banners/reseller-hosting-ldp-inet-service.png",
                pricetbimg: "/public/img/icons/vps-price-table.svg",
                svregister: {
                    title: "Đăng ký chứng chỉ số SSL",
                    data: [
                        {
                            iconurl: "/public/img/icons/positive-ssl.png",
                            des: "Chứng chỉ phổ biến nhất và không có rắc rối. Sự lựa chọn hoàn hảo cho các trang web thông thường",
                            stitle: "POSITIVE SSL"
                        },
                        {
                            iconurl: "/public/img/icons/positive-ssl-wildcard.png",
                            des: "Một giải pháp tiết kiệm chi phí để đảm bảo nhiều tên miền phụ của một tên miền",
                            stitle: "POSITIVE SSL WILDCARD"
                        },
                        {
                            iconurl: "/public/img/icons/comodo-ssl.png",
                            des: "Nhanh nhất và hiệu quả nhất cho một doanh nghiệp trực tuyến để bảo vệ các giao dịch của khách hàng",
                            stitle: "COMODO SSL"
                        },
                        {
                            iconurl: "/public/img/icons/comodo-ev-ssl.png",
                            des: "Dành cho doanh nghiệp lớn với thanh địa chỉ màu xanh lá cây đảm bảo rằng một trang web được an toàn để kinh doanh với mức độ tin cậy cao",
                            stitle: "COMODO EV SSL"
                        }
                    ]
                },
                specification: {
                    columns: [
                        {
                            title: 'Tính năng',
                            name: 'feature'
                        },
                        {
                            title: 'Positive SSL',
                            name: 'pssl'
                        },
                        {
                            title: 'Positive SSL Wildcard',
                            name: 'psslwc'
                        },
                        {
                            title: 'Comodo SLL',
                            name: 'cmdssl'
                        },
                        {
                            title: 'Comodo EV SSL',
                            name: 'cmdevssl'
                        }
                    ],
                    rows: [
                        {
                            'feature': 'Thích hợp',
                            'pssl': 'Website cá nhân, doanh nghiệp và website bán hàng có lượng giao dịch thấp',
                            'psslwc': 'Website có nhiều sub domains, hỗ trợ khách hàng cá nhân',
                            'cmdssl': 'Website bán hàng có lượng giao dịch vừa và nhỏ',
                            'cmdevssl': 'Ngân hàng điện tử, sàn chứng khoán, sàn vàng'
                        },
                        {
                            'feature': 'Mức xác minh khách hàng',
                            'pssl': 'Domain Validation (DV)',
                            'psslwc': 'Domain Validation (DV)',
                            'cmdssl': 'Domain Validation (DV)',
                            'cmdevssl': 'Extended Validation (EV)'
                        },
                        {
                            'feature': "Sức mạnh mã hóa",
                            'pssl': "128/256 bit",
                            'psslwc': "128/256 bit",
                            'cmdssl': "256 bit",
                            'cmdevssl': "256 bit"
                        },
                        {
                            'feature': "Mức bảo hiểm",
                            'pssl': '$10,000',
                            'psslwc': '$10,000',
                            'cmdssl': '$250,000',
                            'cmdevssl': '$175,000'
                        },
                        {
                            'feature': "Miễn phí domain.com khi mua cho www.domain.com",
                            'pssl': 'yes',
                            'psslwc': 'yes',
                            'cmdssl': 'yes',
                            'cmdevssl': 'yes'
                        },
                        {
                            'feature': "Hỗ trợ tên miền SAN",
                            'pssl': 'no',
                            'psslwc': 'no',
                            'cmdssl': 'no',
                            'cmdevssl': 'no'
                        },
                        {
                            'feature': 'Reissue',
                            'pssl': "Miễn phí",
                            'psslwc': "Miễn phí",
                            'cmdssl': "Miễn phí",
                            'cmdevssl': "Miễn phí"
                        },
                        {
                            'feature': 'Thời gian cấp',
                            'pssl': 'Trong vòng 10 phút',
                            'psslwc': "Trong vòng 10 phút",
                            'cmdssl': "Trong vòng 10 phút",
                            'cmdevssl': "Trong vòng 7 ngày làm việc"
                        },
                        {
                            'feature': 'Giá đăng ký/năm',
                            'pssl': $filter('currency')(250000,'đ',1),
                            'psslwc': $filter('currency')(2090000,'đ',1),
                            'cmdssl': $filter('currency')(800000,'đ',1),
                            'cmdevssl': $filter('currency')(4440000,'đ',1)
                        }
                    ]
                }
            },
            sslfree: {
                title: "SSL",
                des: "là viết tắt của từ Secure Sockets Layer, là tiêu chuẩn của công nghệ bảo mật, truyền thông mã hoá giữa máy chủ Web server và trình duyệt (browser). Tiêu chuẩn này hoạt động và đảm bảo rằng các dữ liệu truyền tải giữa máy chủ và trình duyệt của người dùng đều riêng tư và toàn vẹn. SSL hiện tại cũng là tiêu chuẩn bảo mật cho hàng triệu website trên toàn thế giới, nó bảo vệ dữ liệu truyền đi trên môi trường internet được an toàn.",
                img: "/public/img/banners/reseller-hosting-ldp-inet-service.png",
                pricetbimg: "/public/img/icons/vps-price-table.svg",
                svregister: {
                    title: "AN TOÀN - TIN CẬY - HOÀN TOÀN MIỄN PHÍ",
                    data: [
                        {
                            iconurl: "/public/img/ssl/ssl_secure.png",
                            des: "Bảo vệ dữ liệu website của bạn bằng cơ chế mã hoá 256bit, dộ dài khóa 2048bit ngăn chặn các hình thức hack trang web.",
                            stitle: "AN TOÀN BẢO MẬT CAO"
                        },
                        {
                            iconurl: "/public/img/ssl/ssl-encrypt.png",
                            des: "Chứng chỉ SSL Let's Encrypt hỗ trợ bở Google Chrome và Firefox, được tin cậy ở hầu hết tất cả các trình duyệt và trên hầu hết các thiết bị mà bạn đang dùng.",
                            stitle: "ĐÁNG TIN CẬY"
                        },
                        {
                            iconurl: "/public/img/ssl/ssl-free.png",
                            des: "Bạn không phải trả bất kỳ khoản tiền nào cho dịch vụ SSL Let's Encrypt. Chúng tôi đã tích hợp Let's Encrypt trên tất cả các gói Hosting giúp bạn dễ dàng cài đặt và tự động gia hạn hoàn toàn miễn phí.",
                            stitle: "MIỄN PHÍ 100%"
                        }
                    ]
                },
                specification: {
                    columns: [
                        {
                            title: 'Tính năng',
                            name: 'feature'
                        },
                        {
                            title: 'SSL LET\'S ENCRYPT',
                            name: 'sslEncrypt'
                        }
                    ],
                    rows: [
                        {
                            'feature': 'Khả năng mã hóa',
                            'sslEncrypt': 'Mã hóa mạnh mẽ cho tên miền và tên miền con'
                        },
                        {
                            'feature': 'Sức mạnh mã hóa',
                            'sslEncrypt': '256bit'
                        },
                        {
                            'feature': 'Số domain được bảo mật',
                            'sslEncrypt': 'Không giới hạn'
                        },
                        {
                            'feature': 'Hiển thị thanh địa chỉ màu xanh',
                            'sslEncrypt': 'yes'
                        },
                        {
                            'feature': 'Độ tin cậy',
                            'sslEncrypt': 'Chuẩn'
                        },
                        {
                            'feature': 'Chính sách bảo hiểm',
                            'sslEncrypt': 'no'
                        },
                        {
                            'feature': 'Cho phép đăng ký',
                            'sslEncrypt': 'Hoàn toàn miễn phí'
                        },
                        {
                            'feature': 'Phương thức chứng thực',
                            'sslEncrypt': 'Chứng thực qua domain'
                        },
                        {
                            'feature': 'Thời gian cấp phát',
                            'sslEncrypt': '5 phút'
                        },
                        {
                            'feature': 'Thời hạn sử dụng',
                            'sslEncrypt': '90 ngày. Gia hạn lại miễn phí'
                        },
                        {
                            'feature': 'Hỗ trợ SANs/ UCC',
                            'sslEncrypt': 'yes'
                        },
                        {
                            'feature': 'Chứng chỉ OV hoặc EV',
                            'sslEncrypt': 'no'
                        },
                        {
                            'feature': 'Dấu hiệu bảo mật',
                            'sslEncrypt': 'Let\'s Encrypt'
                        },
                        {
                            'feature': 'Wildcard',
                            'sslEncrypt': 'no'
                        },
                        {
                            'feature': 'Hỗ trợ khách hàng',
                            'sslEncrypt': '24/7/365'
                        }
                    ]
                }
            }
        };
        return data;
    }
    
})();