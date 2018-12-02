(function () {
    "use strict";
    iNETPageApp.controller('productsCtrl', productsCtrl);

    productsCtrl.$inject = ['$scope'];
    
    function productsCtrl($scope) {

        $scope.latestProduct = [];
        $scope.latestProduct.push(
            {
                title: 'Hợp đồng - bản khai tên miền trực tuyến',
                icon: 'ion-document-text',
                description: 'Hoàn toàn trực tuyến, thủ tục đơn giản',
                link: 'https://tintuc.inet.vn/inet-trien-khai-thong-dang-ky-ten-mien-vn-hoan-toan-truc-tuyen-dau-tien-o-viet-nam-cho-ca-khach-hang-la-chuc-va-ca-nhan.html'
            }
        );
        $scope.latestProduct.push(
            {
                title: 'Hóa đơn điện tử',
                icon: 'ion-document-text',
                description: 'iNET được tổng cục thuế cấp phép sử dụng hóa đơn điện tử cung cấp cho khách hàng',
                link: '/invoice/list-invoice'
            }
        );
        $scope.latestProduct.push(
            {
                title: 'Cộng tác viên',
                icon: 'ion-cash',
                description: 'Kiếm tiền bằng việc giới thiệu dịch vụ của iNET, hoa hồng cực cao',
                link: '/affiliate'
            }
        );
        //Demo sản phẩm
        $scope.products = [];
        $scope.products.push(
            {
                title: 'Tên miền',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Tên miền .vn',
                        icon: 'icon-dmn-1',
                        description: 'Được VNNIC công nhận là Nhà đăng ký tên miền hỗ trợ khách hàng tốt nhất',
                        link: '/dang-ky-ten-mien'
                    },
                    {
                        title: 'Tên miền quốc tế',
                        icon: 'icon-dmn-1',
                        description: 'Là 1 trong 4 nhà đăng ký tại Việt Nam được ICANN công nhận',
                        link: '/dang-ky-ten-mien'
                    },
                    {
                        title: 'Đặt chỗ tên miền backorder',
                        icon: 'icon-backorder',
                        description: 'Dịch vụ đặt chỗ mua tên miền hết hạn ngay khi tên miền được tự do',
                        link: 'https://backorder.inet.vn'
                    },
                    {
                        title: 'Sàn tên miền',
                        icon: 'icon-dmn-1',
                        description: 'Sàn mua bán tên miền uy tín nhất Việt Nam',
                        link: 'https://santenmien.inet.vn'
                    },
                    {
                        title: 'Khóa tên miền',
                        icon: 'icon-dmn-1',
                        description: 'Dịch vụ bảo vệ an toàn cho tên miền',
                        link: '/khoa-ten-mien'
                    },
                    {
                        title: 'DNSSEC',
                        icon: 'icon-dmn-1',
                        description: 'Dịch vụ bảo vệ an toàn cho khách hàng sử dụng tên miền',
                        link: '/cong-nghe-dnssec'
                    },
                    {
                        title: 'Ẩn thông tin tên miền',
                        icon: 'icon-dmn-1',
                        description: 'Dịch vụ MIỄN PHÍ giúp bạn tránh các tin tức giả mạo, spam khi đăng ký tên miền',
                        link: '/an-thong-tin-whois-ten-mien'
                    },
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Hosting',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Web hosting',
                        icon: 'icon-hosting-1',
                        description: 'Dịch vụ lưu trữ dành cho website PHP/MYSQL',
                        link: '/hosting/web-hosting'
                    },
                    {
                        title: 'SEO hosting',
                        icon: 'icon-hosting-1',
                        description: 'Dịch vụ hosting nhiều địa chỉ IP riêng biệt',
                        link: '/hosting/seo-hosting'
                    },
                    {
                        title: 'Reseller hosting',
                        icon: 'icon-hosting-1',
                        description: 'Dịch vụ hosting cho phép tạo và quản lý nhiều tài khoản hosting có khả năng phân bổ lại cho bên thứ 3 hay phục vụ một hệ thống lớn với nhiều website',
                        link: '/hosting/reseller-hosting'
                    },
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Email',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Email theo tên miền',
                        icon: 'icon-email-1',
                        description: 'Nâng cao uy tín, khẳng định thương hiệu cho doanh nghiệp',
                        link: '/email-theo-ten-mien'
                    },
                    {
                        title: 'Email server riêng',
                        icon: 'icon-email-1',
                        description: 'Dịch vụ máy chủ ảo được thiết kế, tối ưu chuyên biệt cho hệ thống email, không chia sẻ tài nguyên với các khách hàng khác',
                        link: '/email/email-server-rieng'
                    },
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Cloud VPS',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Cloud VPS',
                        icon: 'icon-vps-1',
                        description: 'Dịch vụ lưu trữ cung cấp máy chủ ảo chuyên nghiệp trên nền điện toán đám mây. Sử dụng hoàn toàn ổ cứng SSD.',
                        link: '/vps'
                    }
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Website',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Zozo web',
                        icon: 'icon-web-host-1',
                        description: 'Thiết kế website dựng sẵn với hàng trăm mẫu giao diện và ứng dụng',
                        link: 'https://zozo.vn'
                    }
                ]
            }
        )


        $scope.products.push(
            {
                title: 'SSL',
                description: '',
                link: '',
                items: [
                    {
                        title: 'GeoTrust SSL',
                        icon: 'ion-locked',
                        description: 'Bảo vệ khách hàng, tăng uy tín cho doanh nghiệp',
                        link: '/ssl'
                    }
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Đại lý',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Chương trình đại lý',
                        icon: 'ion-cube',
                        description: 'Cung cấp nền tảng cho đại lý, thương hiệu riêng cho đại lý và chiết khấu tốt nhất',
                        link: '/dai-ly'
                    },
                    {
                        title: 'API',
                        icon: 'ion-code',
                        description: 'API dành cho việc phát triển',
                        link: 'https://github.com/thesunbg/iNET.vn'
                    },
                    {
                        title: 'Plugin WHMCS',
                        icon: 'ion-code',
                        description: 'Plugin đăng ký tên miền để cài vào WHMCS',
                        link: 'https://drive.inet.vn/uploads/donv@inet.vn/download/file-1538814216437_whmcs.zip'
                    }
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Chăm sóc khách hàng',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Cộng tác viên',
                        icon: 'ion-cash',
                        description: 'Kiếm tiền bằng việc giới thiệu dịch vụ của iNET, hoa hồng cực cao',
                        link: '/affiliate'
                    },
                    {
                        title: 'Tích điểm',
                        icon: 'ion-person-stalker',
                        description: 'Chương trình tích điểm dành cho khách hàng thân thiết của iNET',
                        link: '/tich-diem'
                    }
                ]
            }
        )

        $scope.products.push(
            {
                title: 'Công cụ',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Whois',
                        icon: 'ion-ios-search',
                        description: 'Tra cứu thông tin người đăng ký ký miền',
                        link: 'https://whois.inet.vn'
                    },
                    {
                        title: 'Lookup domain record',
                        icon: 'icon-dmn-1',
                        description: 'Kiểm tra bản ghi tên miền',
                        link: 'https://whois.inet.vn/lookup'
                    },
                    {
                        title: 'Verify email',
                        icon: 'ion-email',
                        description: 'Kiểm tra sự tồn tại của email',
                        link: 'https://whois.inet.vn/emailverify'
                    },
                    {
                        title: 'DNS miễn phí',
                        icon: 'ion-shuffle',
                        description: 'Sử dụng DNS của iNET hoàn toàn miễn phí',
                        link: '/dns'
                    }
                ]
            }
        )


        $scope.products.push(
            {
                title: 'Tiện ích',
                description: '',
                link: '',
                items: [
                    {
                        title: 'Hóa đơn điện tử',
                        icon: 'ion-document-text',
                        description: 'iNET được tổng cục thuế cấp phép sử dụng hóa đơn điện tử cung cấp cho khách hàng',
                        link: '/invoice/list-invoice'
                    },
                    {
                        title: 'Hợp đồng - bản khai tên miền trực tuyến',
                        icon: 'ion-document-text',
                        description: 'Hoàn toàn trực tuyến, thủ tục đơn giản',
                        link: 'https://tintuc.inet.vn/inet-trien-khai-thong-dang-ky-ten-mien-vn-hoan-toan-truc-tuyen-dau-tien-o-viet-nam-cho-ca-khach-hang-la-chuc-va-ca-nhan.html'
                    },
                    {
                        title: 'Thanh toán thuận tiện',
                        icon: 'ion-ios-cart',
                        description: 'Hỗ trợ rất nhiều hình thức thanh toán từ online tới offline',
                        link: '/huong-dan-thanh-toan'
                    },
                    {
                        title: 'Ví khách hàng',
                        icon: 'ion-card',
                        description: 'Nạp quỹ vào ví để sử dụng dịch vụ',
                        link: '/mya/add-fund'
                    }
                ]
            }
        )
    }
    
})();