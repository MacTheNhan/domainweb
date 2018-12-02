"use strict";

serviceApp.factory("iNETService", iNETService);

iNETService.$inject = ['$sce', 'sslService'];

function iNETService($sce, sslService) {
    return {
        ldPageCommitment: function () {
            var dataMock = {
                support: {
                    thumbnail: "/public/img/coupon/24-7-support-04.png",
                    title: "Hỗ trợ 24/7/365",
                    desc: 'Đội ngũ kỹ thuật của iNET luôn sẵn sàng phục vụ Quý khách hàng 24/7/365 qua điện thoại, livechat hoặc email với bất kỳ yêu cầu nào của khách hàng'
                },
                commoney: {
                    thumbnail: "/public/img/coupon/back-money.png",
                    title: "Cam kết hoàn tiền",
                    desc: 'iNET cam kết hoàn tiền 100% nếu trong quá trình sử dụng khách hàng không nhận được chất lượng dịch vụ như mong đợi'
                },
                uptime: {
                    thumbnail: "/public/img/coupon/99_uptime.png",
                    title: "99% Uptime",
                    desc: 'iNET hiểu rằng tốc độ tải trang và thời gian website hoạt động là rất quan trọng với khách hàng, iNET cam kết đảm bảo website của bạn hoạt động liên tục 99,9%'
                }
            };
            return dataMock;
        },
        ldPageSvData: function () {
            var techparamenterdata = {
                unlimited: "Không giới hạn",
                free: "Miễn phí",
                yes: 'yes',
                Mb: 'Mb',
                MB: 'MB',
                core: 'Core',
                GB: "GB",
                phpversion: 'Từ 4.4 - 7.2'
            };
            var spcdatagroup = {
                addondomain: {
                    name: "Addon Domain",
                    tip: "Số lượng tên miền được phép tạo để chạy thêm webiste trên gói Hosting"
                },
                ssl: {
                    name: "SSL",
                    tip: "Chứng chỉ bảo mật SSL của <a href='https://tintuc.inet.vn/inet-chinh-thuc-ho-tro-ssl-mien-phi-tu-lets-encrypt.html' target='_blank'>Let's Encrypt</a> được cài đặt miễn phí trên gói Hosting iNET"
                },
                subdomain: {
                    name: "Subdomain",
                    tip: "Số lượng tên miền con của webiste chính được phép tạo trên gói Hosting"
                },
                parkerdomain: {
                    name: "Alias Domain",
                    tip: "Số lượng tên miền được phép tạo để chạy cùng nội dung website chính trên gói Hosting"
                },
                sltkFTP: {
                    name: "Số lượng tài khoản FTP",
                    tip: "Số lượng kết nối FTP để truyền tải dữ liệu trên Hosting"
                },
                dpbPHP: {
                    name: "Đa phiên bản PHP",
                    tip: "Phiên bản PHP 5.1 đến 7.1"
                },
                CPU: {
                    name: "CPU",
                    tip: "Số core CPU của máy chủ được phép sử dụng tối đa trên gói Hosting"
                },
                physicalmemory: {
                    name: "Physical Memory",
                    tip: "Dung lượng Ram máy chủ được phép sử dụng tối đa trên gói Hosting"
                },
                IO: {
                    name: "IO",
                    tip: "Tốc độ truy xuất dữ liệu tối đa tại 1 thời điểm trên gói hosting",
                    unit: techparamenterdata.MB
                },
                entryprocesses: {
                    name: "Entry Processes",
                    tip: "Số tiến trình PHP xử lý đồng thời tại một thời điểm trên gói Hosting"
                },
                fileusage: {
                    name: "File Usage",
                    tip: "Số lượng file, thư mục được lưu trữ trên gói Hosting"
                },
                slknMySQL: {
                    name: "Số lượng kết nối MySQL",
                    tip: "Số lượng kết nối Mysql đồng thời tại một thời điểm trên gói Hosting"
                },
                sldC: {
                    name: "Số lượng dải(lớp) C",
                    tip: "Số lượng lớp C tối đa trên tổng số IP được cấp của gói SEO hosting"
                },
                cPanel: {
                    name: "cPanel quản trị",
                    tip: "Quản lý các gói hosting với giao diện quản trị cPanel phổ biến, chuyên nghiệp"
                },
                domainKeyDKIM: {
                    name: "DomainKeys / DKIM",
                    tip: "Hệ thống KEY xác thực giúp đánh giá email được gửi đi là đúng chủ thể, không bị giả mạo và tin cậy"
                },
                SPF: {
                    name: "SPF - Sender Policy Framework",
                    tip: "Hệ thống xác thực giúp đánh giá email được gửi đi là đúng chủ thể, không bị giả mạo và tin cậy"
                },
                catchAllMailOffice: {
                    name: "Catch-All / Mail Office",
                    tip: "Cho phép nhận tất cả email gửi đến thông qua 1 tài khoản email theo tên miền đó"
                },
                mhsslknPSW: {
                    name: "Mã hóa SSL kết nối POP3/SMTP/WebMail",
                    tip: "Dữ liệu email được gửi đi trên đường truyền internet sẽ được mã hóa giúp bảo mật dữ liệu, chống bị đánh cắp hay rò rỉ thông tin"
                },
                dlmtk: {
                    name: 'Dung lượng',
                    tip: '',
                    unit: techparamenterdata.GB
                }
            };
            var highlightdata = {
                atbm: {
                    title: "An toàn - Bảo mật",
                    des: "Phần mềm quản trị cPanel cùng với hệ điều hành Cloud Linux được sử dụng trên máy chủ hosting iNET giúp ngăn chặn 99,99% nguy cơ tấn công Local-Attack",
                    img: "/public/img/icons/local-attack.png"
                },
                ssd: {
                    title: "Truy xuất nhanh - Tăng tốc xử lý",
                    des: "Máy chủ sử dụng ổ cứng SSD cùng với công nghệ Webserver Litespeed cho tốc độ truy xuất nhanh, tăng tốc xử lý gấp 10 lần so với hệ thống thông thường",
                    img: "/public/img/icons/ssd-speed-ldp-icon.png"
                },
                qldg: {
                    title: "Quản lý đơn giản - dễ dàng",
                    des: "Phần mềm quản trị cPanel chuyên nghiệp được sử dụng trên máy chủ hosting iNET giúp cho việc quản lý các tài khoản hosting đơn giản, dễ dàng",
                    img: "/public/img/icons/cpanel-manager.png"
                },
                taoweb: {
                    title: "Tạo website trong nháy mắt",
                    des: "Phần mềm Softaculous được tích hợp trên cPanel giúp bạn cài đặt các mã nguồn website như wordpress, Joomla,... trong tích tắc",
                    img: "/public/img/icons/install-wordpress-speed.png"
                },
                ht247: {
                    title: "Hỗ trợ 24/7/365",
                    des: "Đội ngũ kỹ thuật giàu kinh nghiệm, chuyên nghiệp, nhiệt tình và chu đáo",
                    img: "/public/img/icons/support-247-why-inet-page.png"
                },
                trial7day: {
                    title: "Trải nghiệm 3 ngày miễn phí",
                    des: "Đăng ký dùng thử ngay trong 3 ngày mà không phải trả thêm bất kỳ chi phí nào",
                    img: "/public/img/icons/trial-3-day.png"
                },
                trial3day: {
                    title: "Trải nghiệm 3 ngày miễn phí",
                    des: "Đăng ký dùng thử ngay trong 3 ngày mà không phải trả thêm bất kỳ chi phí nào",
                    img: "/public/img/icons/trial-3-day.png"
                },
                ncbm: {
                    title: "Nhanh chóng - Bảo mật",
                    des: "Sử dụng công nghệ cân bằng tải cùng với việc tối ưu mã hóa dữ liệu giúp việc gửi nhận/mail diễn ra thông suốt, nhanh chóng, an toàn và bảo mật",
                    img: "/public/img/icons/email-load-balance-ldp-icon.png"
                },
                csvirut: {
                    title: "CHỐNG SPAM/VIRUS",
                    des: "Hệ thống sử dụng phần mềm Anti-spam SpamAssassin giúp việc lọc và xử lý spam hiệu quả",
                    img: "/public/img/icons/email-spam-ldp-icon.png"
                },
                ttvtbdd: {
                    title: "Giao diện quản lý thân thiện",
                    des: "Webmail được thiết kế chuyên dụng cho cả mobile và desktop. Giao diện quản trị tích hợp sẵn trên iPanel giúp cho việc quản lý email đơn giản, dễ dàng.",
                    img: "/public/img/icons/email-responsive-ldp-icon.png"
                },
                cmoutlook: {
                    title: "Check mail trên Outlook và Webmail (POP3/SMTP/Webmail)",
                    des: "Giao diện webmail chuyên nghiệp, cài đặt outlook dễ dàng",
                    img: "/public/img/icons/email-outlook-ldp-icon.png"
                },
                mpcdvviNET: {
                    title: "Miễn phí chuyển dịch vụ về iNET",
                    des: "Hỗ trợ tư vấn, chuyển đổi dịch vụ về iNET miễn phí và nhanh chóng",
                    img: "/public/img/icons/free-move-website-to-inet.png"
                },
                htmmvps: {
                    title: "Hạ tầng mạnh mẽ",
                    des: "Phần cứng sử dụng Chipset Intel E5-2600 V3/V4 cùng RAM DDR4 mới nhất hiện nay. Tăng tốc truy xuất dữ liệu với hệ thống lưu trữ phân tán CEPH SSD lên đến 10.000 IO",
                    img: "/public/img/icons/infrastructure-vps.png"
                },
                htmmhosting: {
                    title: "Hạ tầng mạnh mẽ",
                    des: "Cấu hình máy chủ cao cấp sử dụng Chipset Intel E5-2600 V3/V4 cùng RAM DDR4 mới nhất hiện nay mang lại hiệu xuất xử lý vượt trội cho website của bạn.",
                    img: "/public/img/icons/server-wordpress.png"
                },
                ktnc: {
                    title: "Khởi tạo nhanh chóng",
                    des: "Khởi tạo máy chủ trong nháy mắt chỉ với vài cú click chuột cùng với hệ điều hành phong phú đáp ứng mọi nhu cầu",
                    img: "/public/img/icons/quick-initialization-vps.png"
                },
                dql: {
                    title: "Dễ dàng quản lý",
                    des: "iNET cung cấp giao diện quản lý VPS qua iPanel. Người dùng có thể chủ động quản lý việc kết nối và sử dụng các tính năng như shutdown, start, restart,...",
                    img: "/public/img/icons/cpanel-manager.png"
                },
                wordpress: {
                    title: "Chuyên nghiệp cho Wordpress",
                    des: "Máy chủ được cấu hình, tối ưu, bảo mật và hiệu năng cao dành riêng cho website wordpress",
                    img: "/public/img/icons/server-wordpress.png"
                },
                cdwebwp: {
                    title: "Cài đặt website trong nháy mắt",
                    des: "Phần mềm Softaculous được tích hợp trên cPanel giúp cho việc cài đặt website WordPress cùng hơn 400 mã nguồn phổ biến hiện nay chỉ trong vài cú nhấp chuột",
                    img: "/public/img/icons/install-wordpress-speed.png"
                },
                dddcip: {
                    title: "Đa dạng địa chỉ IP",
                    des: "Cung cấp giải pháp SEO hosting với nhiều địa chỉ IP  khác dải(lớp) C giúp website của bạn đạt thứ hạng nhanh chóng",
                    img: "/public/img/icons/class-c-ip.png"
                },
                ccqlip: {
                    title: "Công cụ quản lý IP dễ dàng",
                    des: "Tích hợp sẵn tính năng quản lý IP trên iPanel, giúp bạn có thể tùy biến, thay đổi IP dễ dàng cho các website của mình",
                    img: "/public/img/icons/tools-ip-manager.png"
                }
            };
            var vpsSpecification = {
                tools: {
                    subtitle: "Công cụ quản trị",
                    value: 'Stop, Start, Reload, Install OS'
                },
                techVps: {
                    subtitle: "Công nghệ ảo hóa",
                    value: 'KVM'
                },
                dataBackUp: {
                    subtitle: "Sao lưu dữ liệu",
                    value: 'Chủ động thao tác'
                }
            };
            var faqglobal = {
                hosting: {
                    q: "Tôi sử dụng tài nguyên không giới hạn như thế nào ?",
                    a: ["Tài nguyên không giới hạn trên hosting nhằm mục đích hỗ trợ khách hàng sử dụng dịch vụ tốt nhất, tránh bị gián đoạn trong quá trình thao tác và vận hành website. Việc sử dụng tài nguyên không giới hạn vào các mục đích lưu trữ, truyền tải các tệp tin, dữ liệu media xem như vi phạm thỏa thuận dịch vụ của chúng tôi.", "Không sử dụng những công cụ, phần mềm auto chiếm tài nguyên liên tục với tần xuất cao. Thiết lập cronjob theo khuyến nghị với tần suất tối thiểu 15 phút, tối đa 5 cronjob."]
                }
            };
            var ansyVpsData = this.prtbdatamock().cloudnew;
            var dataMock = {
                hosting: {
                    linuxnew: {
                        title: "Linux hosting",
                        des: "là dịch vụ lưu trữ website PHP/MYSQL phổ biến nhất hiện nay. Máy chủ sử dụng 100% ổ cứng SSD cùng với công nghệ Cloud Linux  cho website của bạn đạt tốc độ cao, bảo mật và ổn định",
                        img: "/public/img/banners/hosting-linux-banner-sv.png",
                        pricetbimg: "/public/img/icons/hosting.svg",
                        highlights: [
                            {
                                title: highlightdata.atbm.title,
                                des: highlightdata.atbm.des,
                                img: highlightdata.atbm.img
                            },
                            {
                                title: highlightdata.ssd.title,
                                des: highlightdata.ssd.des,
                                img: highlightdata.ssd.img
                            },
                            {
                                title: highlightdata.htmmhosting.title,
                                des: highlightdata.htmmhosting.des,
                                img: highlightdata.htmmhosting.img
                            },
                            {
                                title: highlightdata.mpcdvviNET.title,
                                des: highlightdata.mpcdvviNET.des,
                                img: highlightdata.mpcdvviNET.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "Số lượng Website",
                                pka: "1",
                                pkb: "5",
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Dung lượng",
                                pka: "20GB",
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Băng thông",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.addondomain.name,
                                tooltip: spcdatagroup.addondomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.subdomain.name,
                                tooltip: spcdatagroup.subdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.parkerdomain.name,
                                tooltip: spcdatagroup.parkerdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Database MySQL",
                                pka: "1",
                                pkb: "5",
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.ssl.name,
                                tooltip: $sce.trustAsHtml(spcdatagroup.ssl.tip),
                                pka: techparamenterdata.free,
                                pkb: techparamenterdata.free,
                                pkc: techparamenterdata.free
                            },
                            {
                                attributes: spcdatagroup.sltkFTP.name,
                                tooltip: spcdatagroup.sltkFTP.tip,
                                pka: "10",
                                pkb: "50",
                                pkc: "100"
                            },
                            {
                                attributes: spcdatagroup.dpbPHP.name,
                                pka: techparamenterdata.phpversion,
                                pkb: techparamenterdata.phpversion,
                                pkc: techparamenterdata.phpversion
                            },
                            {
                                attributes: "Backup hàng tuần",
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.CPU.name,
                                tooltip: spcdatagroup.CPU.tip,
                                pka: "1 " + techparamenterdata.core,
                                pkb: "2 " + techparamenterdata.core,
                                pkc: "2 " + techparamenterdata.core
                            },
                            {
                                attributes: spcdatagroup.physicalmemory.name,
                                tooltip: spcdatagroup.physicalmemory.tip,
                                pka: "1 " + techparamenterdata.GB,
                                pkb: "1 " + techparamenterdata.GB,
                                pkc: "2 " + techparamenterdata.GB
                            },
                            {
                                attributes: spcdatagroup.IO.name,
                                tooltip: spcdatagroup.IO.tip,
                                pka: "2 " + spcdatagroup.IO.unit,
                                pkb: "3 " + spcdatagroup.IO.unit,
                                pkc: "5 " + spcdatagroup.IO.unit
                            },
                            {
                                attributes: spcdatagroup.entryprocesses.name,
                                tooltip: spcdatagroup.entryprocesses.tip,
                                pka: "20",
                                pkb: "30",
                                pkc: "40"
                            },
                            {
                                attributes: spcdatagroup.fileusage.name,
                                tooltip: spcdatagroup.fileusage.tip,
                                pka: "100000",
                                pkb: "200000",
                                pkc: "500000"
                            },
                            {
                                attributes: spcdatagroup.slknMySQL.name,
                                tooltip: spcdatagroup.slknMySQL.tip,
                                pka: "30",
                                pkb: "30",
                                pkc: "30"
                            }
                        ],
                        faq: [
                            {
                                title: faqglobal.hosting.q,
                                content: faqglobal.hosting.a,
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao nên sử dụng Linux hosting tại iNET ?',
                                content: ['Hệ thống an toàn - tốc độ - ổn định, sử dụng 100% ổ cứng SSD cùng với hệ điều hành Cloud Linux cho chất lượng dịch vụ cao nhất.','Hỗ trợ 24/7/365 với đội ngũ kỹ thuật giàu kinh nghiệm, chuyên nghiệp, nhiệt tình và chu đáo'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Các gói Linux hosting tại iNET có gì khác nhau ?',
                                content: ['iNET cung cấp nhiều gói Hosting với các tính năng và tài nguyên sử dụng khác nhau nhằm giúp khách hàng có nhiều chọn lựa phù hợp với nhu cầu của mình:','Nếu website của bạn mới khởi tạo hay đang chạy với lượng truy cập thấp thì Hosting gói A sẽ là lựa chọn tốt nhất', 'Nếu bạn đang chạy nhiều website trên một gói hay website có lượng truy cập lớn, hãy chọn gói Hosting lớn hơn để phù hợp với mục đích của bạn. Để tốt cho việc kinh doanh, chúng tôi khuyên dùng bạn nên sử dụng Hosting gói B trở lên để đảm bảo cho website được hoạt động tốt nhất'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Sử dụng hosting tại iNET, tôi được những quyền lợi gì ?',
                                content: ['Hỗ trợ dịch vụ từ A - Z với đội ngũ kỹ thuật giàu kinh nghiệm, nhiệt tình và chu đáo','Khi đăng ký Hosting tại iNET, bạn sẽ được hỗ trợ chuyển dữ liệu miễn phí từ nhà cung cấp khác về iNET mà không cần phải lo lắng về vấn đề kỹ thuật và việc hoạt động của website'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi cần phải biết quản trị máy chủ Linux để sử dụng Hosting tại iNET không ?',
                                content: ['KHÔNG! Bạn không cần phải hiểu biết hay kiến thức liên quan đến vận hành máy chủ. Thay vào đó, iNET đã tạo và cung cấp môi trường lý trưởng nhất để bạn có thể sử dụng và vận hành website của mình một cách ổn định - bảo mật - nhanh chóng'],
                                isFirstOpen: false
                            }
                        ]
                    },
                    wordpressnew: {
                        title: "Web hosting",
                        des: " là dịch vụ lưu trữ dành cho website PHP/MYSQL và được tích hợp sẵn bản điều khiển cài đặt tự động hơn 400 mã nguồn phổ biến nhất hiện nay như Worpdress, Joomla, Drupal,... Máy chủ sử dụng 100% ổ cứng SSD cùng với công nghệ Cloud Linux giúp cho website đạt tốc độ cao, bảo mật và ổn định",
                        img: "/public/img/banners/hosting-linux-banner-sv.png",
                        pricetbimg: "/public/img/icons/wordpress-hosting.svg",
                        highlights: [
                            {
                                title: highlightdata.htmmhosting.title,
                                des: highlightdata.htmmhosting.des,
                                img: highlightdata.htmmhosting.img
                            },
                            {
                                title: highlightdata.ssd.title,
                                des: highlightdata.ssd.des,
                                img: highlightdata.ssd.img
                            },
                            {
                                title: highlightdata.cdwebwp.title,
                                des: highlightdata.cdwebwp.des,
                                img: highlightdata.cdwebwp.img
                            },
                            {
                                title: highlightdata.atbm.title,
                                des: highlightdata.atbm.des,
                                img: highlightdata.atbm.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "Số lượng Website",
                                pka: "1",
                                pkb: "5",
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Dung lượng",
                                pka: "20GB",
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Băng thông",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.addondomain.name,
                                tooltip: spcdatagroup.addondomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.subdomain.name,
                                tooltip: spcdatagroup.subdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.parkerdomain.name,
                                tooltip: spcdatagroup.parkerdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Database MySQL",
                                pka: "1",
                                pkb: "5",
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.ssl.name,
                                tooltip: $sce.trustAsHtml(spcdatagroup.ssl.tip),
                                pka: techparamenterdata.free,
                                pkb: techparamenterdata.free,
                                pkc: techparamenterdata.free
                            },
                            {
                                attributes: spcdatagroup.sltkFTP.name,
                                tooltip: spcdatagroup.sltkFTP.tip,
                                pka: "10",
                                pkb: "50",
                                pkc: "100"
                            },
                            {
                                attributes: spcdatagroup.dpbPHP.name,
                                pka: techparamenterdata.phpversion,
                                pkb: techparamenterdata.phpversion,
                                pkc: techparamenterdata.phpversion
                            },
                            {
                                attributes: "Backup hàng tuần",
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.CPU.name,
                                tooltip: spcdatagroup.CPU.tip,
                                pka: "1 " + techparamenterdata.core,
                                pkb: "2 " + techparamenterdata.core,
                                pkc: "2 " + techparamenterdata.core
                            },
                            {
                                attributes: spcdatagroup.physicalmemory.name,
                                tooltip: spcdatagroup.physicalmemory.tip,
                                pka: "1 " + techparamenterdata.GB,
                                pkb: "1 " + techparamenterdata.GB,
                                pkc: "2 " + techparamenterdata.GB
                            },
                            {
                                attributes: spcdatagroup.IO.name,
                                tooltip: spcdatagroup.IO.tip,
                                pka: "2 " + spcdatagroup.IO.unit,
                                pkb: "3 " + spcdatagroup.IO.unit,
                                pkc: "5 " + spcdatagroup.IO.unit
                            },
                            {
                                attributes: spcdatagroup.entryprocesses.name,
                                tooltip: spcdatagroup.entryprocesses.tip,
                                pka: "20",
                                pkb: "30",
                                pkc: "40"
                            },
                            {
                                attributes: spcdatagroup.fileusage.name,
                                tooltip: spcdatagroup.fileusage.tip,
                                pka: "100000",
                                pkb: "200000",
                                pkc: "500000"
                            },
                            {
                                attributes: spcdatagroup.slknMySQL.name,
                                tooltip: spcdatagroup.slknMySQL.tip,
                                pka: "30",
                                pkb: "30",
                                pkc: "30"
                            }
                        ],
                        faq: [
                            {
                                title: faqglobal.hosting.q,
                                content: faqglobal.hosting.a,
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao nên dùng Web hosting tại iNET ?',
                                content: ['Với đội ngũ kỹ thuật giàu kinh nghiệm, máy chủ Web hosting tại iNET được cấu hình tối ưu về bảo mật, hiệu năng cao nhất nhằm giúp cho việc vận hành một website của bạn trở nên dễ dàng, an toàn, bảo mật và đạt tốc độ cao'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể cài đặt website wordpress trên hosting iNET như thế nào ?',
                                content: ['Phần mềm Softaculous được tích hợp trong Control cPanel trên máy chủ Wordress Hosting iNET, giúp cho việc cài đặt website WordPress trở nên dễ dàng hơn bao giờ hết với chỉ vài cú nhấp chuột. Tính năng này giúp bạn nhanh chóng xây dựng cho mình một Website hay Blog cá nhân mà không cần am hiểu về lập trình.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Các gói Web hosting tại iNET có gì khác nhau ?',
                                content: ['iNET cung cấp nhiều gói Hosting với các tính năng và tài nguyên đa dạng nhằm giúp khách hàng có nhiều sự lựa chọn để phù hợp với nhu cầu của mình: ','Nếu website của bạn mới khởi tạo hay đang chạy với lượng truy cập thấp thì Hosting gói A sẽ là lựa chọn tốt nhất','Nếu bạn đang chạy nhiều website trên một gói hay website có lượng truy cập lớn, hãy chọn gói Hosting lớn hơn để phù hợp với mục đích của bạn. Để tốt cho việc kinh doanh, chúng tôi khuyên dùng bạn nên sử dụng Hosting gói B trở lên để đảm bảo cho website được hoạt động tốt nhất'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Sử dụng hosting tại iNET, tôi được những quyền lợi gì ?',
                                content: ['Hỗ trợ dịch vụ từ A - Z với đội ngũ kỹ thuật giàu kinh nghiệm, nhiệt tình và chu đáo','Khi đăng ký Hosting tại iNET, bạn sẽ được hỗ trợ chuyển dữ liệu miễn phí từ nhà cung cấp khác về iNET mà không cần phải lo lắng về vấn đề kỹ thuật và việc hoạt động của website'],
                                isFirstOpen: false
                            }
                        ],
                        saleoff: "Web hosting chỉ với <strong class='txt-sz-24px'>49K</strong>"
                    },
                    seoclassc: {
                        title: "SEO hosting",
                        des: "là dịch vụ lưu trữ cho phép một tài khoản hosting có thể chạy được nhiều website với mỗi địa chỉ IP riêng biệt. Với việc TỐI ƯU 8 DẢI(LỚP) IP KHÁC NHAU, tại Việt Nam chúng tôi là đơn vị đi đầu trong giải pháp cung cấp SEO hosting nhiều địa chỉ IP khác dải(lớp) C",
                        img: "/public/img/banners/seo-hosting-ldp-inet-service.png",
                        pricetbimg: "/public/img/icons/seo-hosting.svg",
                        highlights: [
                            {
                                title: highlightdata.dddcip.title,
                                des: highlightdata.dddcip.des,
                                img: highlightdata.dddcip.img
                            },
                            {
                                title: highlightdata.ssd.title,
                                des: highlightdata.ssd.des,
                                img: highlightdata.ssd.img
                            },
                            {
                                title: highlightdata.ccqlip.title,
                                des: highlightdata.ccqlip.des,
                                img: highlightdata.ccqlip.img
                            },
                            {
                                title: highlightdata.htmmhosting.title,
                                des: highlightdata.htmmhosting.des,
                                img: highlightdata.htmmhosting.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "Địa chỉ IP",
                                tooltip: "",
                                pka: "6",
                                pkb: "12",
                                pkc: "24"
                            },
                            {
                                attributes: spcdatagroup.sldC.name,
                                tooltip: spcdatagroup.sldC.tip,
                                pka: "2",
                                pkb: "4",
                                pkc: "8"
                            },
                            {
                                attributes: "Số lượng Website",
                                tooltip: "",
                                pka: "6",
                                pkb: "12",
                                pkc: "24"
                            },
                            {
                                attributes: "Dung lượng",
                                tooltip: "",
                                pka: "20GB",
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Băng thông",
                                tooltip: "",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.addondomain.name,
                                tooltip: spcdatagroup.addondomain.tip,
                                pka: "6",
                                pkb: "12",
                                pkc: "24"
                            },
                            {
                                attributes: spcdatagroup.subdomain.name,
                                tooltip: spcdatagroup.subdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.parkerdomain.name,
                                tooltip: spcdatagroup.parkerdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Database MySQL",
                                tooltip: "",
                                pka: "6",
                                pkb: "12",
                                pkc: "24"
                            },
                            {
                                attributes: spcdatagroup.ssl.name,
                                tooltip: $sce.trustAsHtml(spcdatagroup.ssl.tip),
                                pka: techparamenterdata.free,
                                pkb: techparamenterdata.free,
                                pkc: techparamenterdata.free
                            },
                            {
                                attributes: spcdatagroup.sltkFTP.name,
                                tooltip: spcdatagroup.sltkFTP.tip,
                                pka: "10",
                                pkb: "50",
                                pkc: "100"
                            },
                            {
                                attributes: spcdatagroup.dpbPHP.name,
                                pka: techparamenterdata.phpversion,
                                pkb: techparamenterdata.phpversion,
                                pkc: techparamenterdata.phpversion
                            },
                            {
                                attributes: "Backup hàng tuần",
                                tooltip: "",
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.CPU.name,
                                tooltip: spcdatagroup.CPU.tip,
                                pka: "1 " + techparamenterdata.core,
                                pkb: "2 " + techparamenterdata.core,
                                pkc: "3 " + techparamenterdata.core
                            },
                            {
                                attributes: spcdatagroup.physicalmemory.name,
                                tooltip: spcdatagroup.physicalmemory.tip,
                                pka: "1 " + techparamenterdata.GB,
                                pkb: "1.5 " + techparamenterdata.GB,
                                pkc: "2 " + techparamenterdata.GB
                            },
                            {
                                attributes: spcdatagroup.IO.name,
                                tooltip: spcdatagroup.IO.tip,
                                pka: "3 " + spcdatagroup.IO.unit,
                                pkb: "4 " + spcdatagroup.IO.unit,
                                pkc: "5 " + spcdatagroup.IO.unit
                            },
                            {
                                attributes: spcdatagroup.entryprocesses.name,
                                tooltip: spcdatagroup.entryprocesses.tip,
                                pka: "20",
                                pkb: "30",
                                pkc: "40"
                            },
                            {
                                attributes: spcdatagroup.fileusage.name,
                                tooltip: spcdatagroup.fileusage.tip,
                                pka: "200000",
                                pkb: "250000",
                                pkc: "500000"
                            },
                            {
                                attributes: spcdatagroup.slknMySQL.name,
                                tooltip: spcdatagroup.slknMySQL.tip,
                                pka: "30",
                                pkb: "30",
                                pkc: "30"
                            }
                        ],
                        faq: [
                            {
                                title: faqglobal.hosting.q,
                                content: faqglobal.hosting.a,
                                isFirstOpen: true
                            },
                            {
                                title: 'Seo Hosting khác dải(lớp) C là gì?',
                                content: ['SEO hosting là hosting có khả năng chạy nhiều địa chỉ IP trong đó một địa chỉ IP sẽ có cấu trúc dạng A.B.C.D, iNET cung cấp SEO hosting với nhiều địa chỉ IP khác dải C.','Thuật toán của Google và các công cụ tìm kiếm khác, họ kiểm tra tính hợp lệ các traffic qua địa chỉ IP truy cập và việc hợp lệ này được xác nhận qua địa chỉ IP dải(lớp) C mà không cần phải kiểm tra các IP dải còn lại.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tại sao nên sử dụng SEO hosting tại iNET ?',
                                content: ['Tại Việt Nam chúng tôi là đơn vị đi đầu trong giải pháp cung cấp SEO hosting nhiều địa chỉ IP khác dải(lớp) C Với việc tối ưu lên đến 8 dải(lớp) C, SEO hosting iNET đáp ứng tốt nhất cho kết quả Search Engine của bạn.','Một website chính và nhiều website vệ tinh với các địa chỉ IP khác nhau. Nếu bạn xây dựng website chính và tất cả các website vệ tinh trên cùng 1 địa chỉ IP sẽ dẫn đến hiệu quả SEO giảm thấp hơn do đánh giá từ phía google.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Các gói SEO hosting tại iNET có gì khác nhau ?',
                                content: ['iNET cung cấp các gói hosting với nhiều địa chỉ IP khác dải(lớp) C. Với nhu cầu sử dụng, bạn có thể lựa chọn cho mình gói SEO hosting để có số địa chỉ IP và số lượng website phù hợp.','Cũng như shared hosting, các gói hosting tại iNET được phân bổ tài nguyên xử lý CPU, RAM,... được ghi rõ trong nội dung thông số kỹ thuật'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi quản lý tài khoản SEO hosting như thế nào ?',
                                content: ['iNET cung cấp giao diện quản lý addon website trên iPanel, bạn có thể thêm website với tùy chọn IP theo nhu cầu sử dụng.'],
                                isFirstOpen: false
                            }
                        ],
                        saleoff: "Hosting chỉ với <strong class='txt-sz-24px'>149K</strong>"
                    },
                    reseller: {
                        title: "Reseller hosting",
                        des: "là dịch vụ lưu trữ cho phép tạo và quản lý nhiều tài khoản hosting có khả năng phân bổ lại cho bên thứ 3 hay phục vụ một hệ thống lớn với nhiều website. Máy chủ sử dụng 100% ổ cứng SSD cùng với công nghệ Cloud Linux giúp cho website đặt tốc độ cao, bảo mật và ổn định",
                        img: "/public/img/banners/hosting-linux-banner-sv.png",
                        pricetbimg: "/public/img/icons/reseller-hosting.svg",
                        highlights: [
                            {
                                title: highlightdata.atbm.title,
                                des: highlightdata.atbm.des,
                                img: highlightdata.atbm.img
                            },
                            {
                                title: highlightdata.ssd.title,
                                des: highlightdata.ssd.des,
                                img: highlightdata.ssd.img
                            },
                            {
                                title: highlightdata.htmmhosting.title,
                                des: highlightdata.htmmhosting.des,
                                img: highlightdata.htmmhosting.img
                            },
                            {
                                title: highlightdata.taoweb.title,
                                des: highlightdata.taoweb.des,
                                img: highlightdata.taoweb.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "Số lượng tài khoản",
                                tooltip: "",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited,
                                pkd: techparamenterdata.unlimited,
                                pke: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Dung lượng",
                                tooltip: "",
                                pka: "10" + techparamenterdata.GB,
                                pkb: "20" + techparamenterdata.GB,
                                pkc: "30" + techparamenterdata.GB,
                                pkd: "40" + techparamenterdata.GB,
                                pke: "50" + techparamenterdata.GB
                            },
                            {
                                attributes: "Băng thông",
                                tooltip: "",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited,
                                pkd: techparamenterdata.unlimited,
                                pke: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.dpbPHP.name,
                                pka: techparamenterdata.phpversion,
                                pkb: techparamenterdata.phpversion,
                                pkc: techparamenterdata.phpversion,
                                pkd: techparamenterdata.phpversion,
                                pke: techparamenterdata.phpversion
                            },
                            {
                                attributes: "Backup hàng tuần",
                                tooltip: "",
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes,
                                pkd: techparamenterdata.yes,
                                pke: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.cPanel.name,
                                tooltip: spcdatagroup.cPanel.tip,
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes,
                                pkd: techparamenterdata.yes,
                                pke: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.ssl.name,
                                tooltip: $sce.trustAsHtml(spcdatagroup.ssl.tip),
                                pka: techparamenterdata.free,
                                pkb: techparamenterdata.free,
                                pkc: techparamenterdata.free,
                                pkd: techparamenterdata.free,
                                pke: techparamenterdata.free
                            }
                        ],
                        spcextend: {
                            title: "Tài nguyên xử lý của mỗi tài khoản hosting được tạo ra từ Reseller",
                            data: [
                                {
                                    attributes: spcdatagroup.CPU.name,
                                    tooltip: spcdatagroup.CPU.tip,
                                    pka: "1.5 Core"
                                },
                                {
                                    attributes: spcdatagroup.physicalmemory.name,
                                    tooltip: spcdatagroup.physicalmemory.tip,
                                    pka: "1 " + techparamenterdata.GB
                                },
                                {
                                    attributes: spcdatagroup.IO.name,
                                    tooltip: spcdatagroup.IO.tip,
                                    pka: "2 " + spcdatagroup.IO.unit
                                },
                                {
                                    attributes: spcdatagroup.entryprocesses.name,
                                    tooltip: spcdatagroup.entryprocesses.tip,
                                    pka: "20"
                                },
                                {
                                    attributes: spcdatagroup.fileusage.name,
                                    tooltip: spcdatagroup.fileusage.tip,
                                    pka: "150000"
                                },
                                {
                                    attributes: spcdatagroup.slknMySQL.name,
                                    tooltip: spcdatagroup.slknMySQL.tip,
                                    pka: "30"
                                }
                            ]
                        },
                        faq: [
                            {
                                title: faqglobal.hosting.q,
                                content: faqglobal.hosting.a,
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao phải sử dụng Reseller hosting tại iNET ?',
                                content: ['Với việc không giới hạn băng thông và số lượng tài khoản, Reseller hosting giúp mạng lại hiệu quả hoạt động, tiết kiệm chi phí nhất cho bạn.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Các gói Reseller hosting tại iNET có gì khác nhau ?',
                                content: ['iNET cung cấp các gói Reseller hosting với các dung lượng khác nhau để phù hợp cho từng nhu cầu sử dụng của bạn. Cũng như shared hosting, các gói hosting tại iNET được phân bổ tài nguyên xử lý CPU, RAM,... được ghi rõ trong nội dung thông số kỹ thuật'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi quản lý tài khoản Reseller hosting như thế nào ?',
                                content: ['Reseller hosting tại iNET sử dụng phần mềm cPanel hosting chuyên nghiệp giúp cho việc quản lý các tài khoản hosting của bạn rất đơn giản và dễ dàng'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Sử dụng hosting tại iNET, tôi được những quyền lợi gì ?',
                                content: ['Hỗ trợ dịch vụ từ A - Z với đội ngũ kỹ thuật giàu kinh nghiệm, nhiệt tình và chu đáo','Khi đăng ký Hosting tại iNET, bạn sẽ được hỗ trợ chuyển dữ liệu miễn phí từ nhà cung cấp khác về iNET mà không cần phải lo lắng về vấn đề kỹ thuật và việc hoạt động của website'],
                                isFirstOpen: false
                            }
                        ],
                        saleoff: "Reseller hosting chỉ với <strong class='txt-sz-24px'>390K</strong>"
                    },
                    business: {
                        title: "Business hosting",
                        des: "là dịch vụ lưu trữ được thiết kế, vận hành dành cho các website có lưu lượng truy cập lớn, yêu cầu tài nguyên xử lý cao hay đáp ứng cho nhu cầu của bạn đang cần một Hosting mạnh mẽ hơn thay vì việc phải sử dụng VPS để tự quản lý.",
                        img: "/public/img/banners/hosting-linux-banner-sv.png",
                        pricetbimg: "/public/img/icons/hosting.svg",
                        highlights: [
                            {
                                title: highlightdata.htmmhosting.title,
                                des: highlightdata.htmmhosting.des,
                                img: highlightdata.htmmhosting.img
                            },
                            {
                                title: highlightdata.ssd.title,
                                des: highlightdata.ssd.des,
                                img: highlightdata.ssd.img
                            },
                            {
                                title: highlightdata.cdwebwp.title,
                                des: highlightdata.cdwebwp.des,
                                img: highlightdata.cdwebwp.img
                            },
                            {
                                title: highlightdata.atbm.title,
                                des: highlightdata.atbm.des,
                                img: highlightdata.atbm.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "Số lượng Website",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Dung lượng",
                                pka: "10GB",
                                pkb: "20GB",
                                pkc: "40GB"
                            },
                            {
                                attributes: "Băng thông",
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.addondomain.name,
                                tooltip: spcdatagroup.addondomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.subdomain.name,
                                tooltip: spcdatagroup.subdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.parkerdomain.name,
                                tooltip: spcdatagroup.parkerdomain.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: "Database MySQL",
                                pka: techparamenterdata.unlimited,
                                pkb:techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.ssl.name,
                                tooltip: $sce.trustAsHtml(spcdatagroup.ssl.tip),
                                pka: techparamenterdata.free,
                                pkb: techparamenterdata.free,
                                pkc: techparamenterdata.free
                            },
                            {
                                attributes: spcdatagroup.sltkFTP.name,
                                tooltip: spcdatagroup.sltkFTP.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.dpbPHP.name,
                                pka: techparamenterdata.phpversion,
                                pkb: techparamenterdata.phpversion,
                                pkc: techparamenterdata.phpversion
                            },
                            {
                                attributes: "Backup hàng tuần",
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes
                            },
                            {
                                attributes: "IP riêng",
                                pka: "Không",
                                pkb: "Không",
                                pkc: "1 IP"
                            },
                            {
                                attributes: spcdatagroup.CPU.name,
                                tooltip: spcdatagroup.CPU.tip,
                                pka: "2 " + techparamenterdata.core,
                                pkb: "4 " + techparamenterdata.core,
                                pkc: "6 " + techparamenterdata.core
                            },
                            {
                                attributes: spcdatagroup.physicalmemory.name,
                                tooltip: spcdatagroup.physicalmemory.tip,
                                pka: "2 " + techparamenterdata.GB,
                                pkb: "4 " + techparamenterdata.GB,
                                pkc: "6 " + techparamenterdata.GB
                            },
                            {
                                attributes: spcdatagroup.IO.name,
                                tooltip: spcdatagroup.IO.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.entryprocesses.name,
                                tooltip: spcdatagroup.entryprocesses.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.fileusage.name,
                                tooltip: spcdatagroup.fileusage.tip,
                                pka: techparamenterdata.unlimited,
                                pkb: techparamenterdata.unlimited,
                                pkc: techparamenterdata.unlimited
                            },
                            {
                                attributes: spcdatagroup.slknMySQL.name,
                                tooltip: spcdatagroup.slknMySQL.tip,
                                pka: "200",
                                pkb: "200",
                                pkc: "200"
                            }
                        ],
                        faq: [
                            {
                                title: 'Tại sao phải dùng Business hosting tại iNET ?',
                                content: ['Business hosting được iNET thiết kế tối ưu – bảo mật toàn diện, phù hợp cho website có lưu lượng truy cập lớn.', 'Thay vì phải quản lý VPS để sở hữu tài nguyên xử lý cao thì iNET đã tích hợp vào gói Business hosting quản lý qua Control cPanel mà không cần thêm bất kỳ kỹ năng quản trị nâng cao nào.'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Business hosting khác gì so với Hosting thông thường ?',
                                content: ['Được thiết kế với tài nguyên xử lý cao CPU, RAM và kết nối Mysql lên đến 200 kết nối đồng thời giúp tăng truy cập cho website của bạn', 'Không giới hạn số lượng file lưu trữ, tiến trình xử lý. Cho phép khách hàng sử dụng tối đa dung lượng được cấp trên gói Hosting'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Tôi sử dụng tài nguyên trên Business hosting như thế nào ?',
                                content: ['Business hosting được phân bổ tài nguyên lớn, khách hàng có toàn quyền sử dụng tối đa tài nguyên được cấp trên gói Hosting của mình.', 'Business hosting cho phép bạn thiết lập số lượng cronjob không giới hạn và tần suất tối thiểu 5 phút 1 lần'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Sử dụng hosting tại iNET, tôi được những quyền lợi gì ?',
                                content: ['Hỗ trợ dịch vụ từ A - Z với đội ngũ kỹ thuật giàu kinh nghiệm, nhiệt tình và chu đáo','Khi đăng ký Hosting tại iNET, bạn sẽ được hỗ trợ chuyển dữ liệu miễn phí từ nhà cung cấp khác về iNET mà không cần phải lo lắng về vấn đề kỹ thuật và việc hoạt động của website'],
                                isFirstOpen: false
                            }
                        ]
                    }
                },
                email: {
                    emailnew: {
                        title: "Email theo tên miền",
                        des: "là dịch vụ lưu trữ email theo tên miền được thiết kế, tối ưu chuyên dụng để phục vụ việc trao đổi, giao dịch trực tuyến. Sử dụng email theo tên miền giúp NÂNG CAO UY TÍN - KHẲNG ĐỊNH THƯƠNG HIỆU trên Internet cho cá nhân và doanh nghiệp của bạn.",
                        img: "/public/img/banners/email-theo-ten-mien-featured.png",
                        pricetbimg: "/public/img/icons/email-price-table.svg",
                        highlights: [
                            {
                                title: highlightdata.ncbm.title,
                                des: highlightdata.ncbm.des,
                                img: highlightdata.ncbm.img
                            },
                            {
                                title: highlightdata.csvirut.title,
                                des: highlightdata.csvirut.des,
                                img: highlightdata.csvirut.img
                            },
                            {
                                title: highlightdata.ttvtbdd.title,
                                des: highlightdata.ttvtbdd.des,
                                img: highlightdata.ttvtbdd.img
                            },
                            {
                                title: highlightdata.cmoutlook.title,
                                des: highlightdata.cmoutlook.des,
                                img: highlightdata.cmoutlook.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: {
                            columns: [
                                {
                                    title: 'Gói A',
                                    name: 'goia'
                                },
                                {
                                    title: 'Gói B',
                                    name: 'goib'
                                },
                                {
                                    title: 'Gói C',
                                    name: 'goic'
                                },
                                {
                                    title: 'Gói D',
                                    name: 'goid'
                                },
                                {
                                    title: 'Gói E',
                                    name: 'goie'
                                }
                            ],
                            rows: [
                                {
                                    'attributes': 'Số lượng địa chỉ Email',
                                    'goia': '5',
                                    'goib': '20',
                                    'goic': '50',
                                    'goid': '150',
                                    'goie': '300'
                                },
                                {
                                    'attributes': 'Dung lượng',
                                    'goia': '5GB',
                                    'goib': '30GB',
                                    'goic': '100GB',
                                    'goid': '225GB',
                                    'goie': '500GB'
                                },
                                {
                                    'attributes': 'Dung lượng file đính kèm',
                                    'goia': '25MB',
                                    'goib': '25MB',
                                    'goic': '25MB',
                                    'goid': '25MB',
                                    'goie': '25MB'
                                },
                                {
                                    'attributes': 'Tùy chỉnh dung lượng từng tài khoản',
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes
                                },
                                {
                                    'attributes': spcdatagroup.domainKeyDKIM.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.domainKeyDKIM.tip
                                },
                                {
                                    'attributes': spcdatagroup.SPF.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.SPF.tip
                                },
                                {
                                    'attributes': spcdatagroup.catchAllMailOffice.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.catchAllMailOffice.tip
                                },
                                {
                                    'attributes': spcdatagroup.mhsslknPSW.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.mhsslknPSW.tip
                                },
                                {
                                    'attributes': 'Webmail',
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes
                                },
                                {
                                    'attributes': 'Công cụ quản lý',
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes
                                },
                                {
                                    'attributes': 'Tần suất gửi mail (email/giờ)',
                                    'goia': '200',
                                    'goib': '200',
                                    'goic': '200',
                                    'goid': '200',
                                    'goie': '200'
                                }
                            ]
                        },
                        faq: [
                            {
                                title: 'Tại sao phải dùng email theo tên miền ?',
                                content: ['Nâng cao uy tín, khẳng định thương hiệu trên internet cho cá nhân và doanh nghiệp của bạn','Quản lý công việc của nhân viên hiệu quả, kiểm tra và điều chỉnh kịp thời khi cần thiết','iNET tối ưu hệ thống giúp cho việc gửi nhận mail diễn ra nhanh chóng, an toàn, tiện lợi'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao không nên dùng email theo tên miền trên hosting ?',
                                content: ['Email theo tên miền trên hosting là dịch vụ miễn phí kèm theo khi sử dụng hosting vì vậy sẽ không được cam kết đảm bảo hoạt động gửi/nhận mail tốt nhất'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể chuyển dịch vụ email từ nhà cung cấp khác về iNET ?',
                                content: ['Có! Bạn chỉ cần cung cấp các thông tin từ nhà cung cấp cũ cho iNET, chúng tôi sẽ kiểm tra phân tích và chuyển dữ liệu cho bạn hoàn toàn miễn phí về iNET.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể sử dụng email doanh nghiệp để gửi email quảng cáo không ?',
                                content: ['Bạn có thể sử dụng email doanh nghiệp để gửi thư quảng cáo đến khách hàng của mình với số lượng được ghi rõ trong thông số kỹ thuật.','Và luôn tuân thủ nghiên nghặt quy định của các tổ chức chống SPAM quốc tế để đảm bảo tên miền cũng như từ khóa gửi mail không bị liệt kê vào backlist của các tổ chức đó.','Trong trường hợp có các email cố tình gửi spam, hệ thống sẽ tự động suspend email đó và thông báo cho bạn để kiểm tra, xử lý.'],
                                isFirstOpen: false
                            }
                        ],
                        saleoff: "gói Email theo tên miền chỉ với <strong class='txt-sz-24px'>49K</strong>"
                    },
                    bigmail: {
                        title: "Big Mail",
                        des: "là dịch lưu trữ email theo tên miền phù hợp với nhu cầu sử dụng dung lượng lớn. Sử dụng email theo tên miền giúp NÂNG CAO UY TÍN - KHẲNG ĐỊNH THƯƠNG HIỆU trên Internet cho cá nhân và doanh nghiệp của bạn.",
                        img: "/public/img/banners/hosting-linux-banner-sv.png",
                        pricetbimg: "/public/img/icons/email-price-table.svg",
                        highlights: [
                            {
                                title: highlightdata.ncbm.title,
                                des: highlightdata.ncbm.des,
                                img: highlightdata.ncbm.img
                            },
                            {
                                title: highlightdata.csvirut.title,
                                des: highlightdata.csvirut.des,
                                img: highlightdata.csvirut.img
                            },
                            {
                                title: highlightdata.ttvtbdd.title,
                                des: highlightdata.ttvtbdd.des,
                                img: highlightdata.ttvtbdd.img
                            },
                            {
                                title: highlightdata.cmoutlook.title,
                                des: highlightdata.cmoutlook.des,
                                img: highlightdata.cmoutlook.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: {
                            columns: [
                                {
                                    title: 'Gói A',
                                    name: 'goia'
                                },
                                {
                                    title: 'Gói B',
                                    name: 'goib'
                                },
                                {
                                    title: 'Gói C',
                                    name: 'goic'
                                },
                                {
                                    title: 'Gói D',
                                    name: 'goid'
                                },
                                {
                                    title: 'Gói E',
                                    name: 'goie'
                                }
                            ],
                            rows: [
                                {
                                    'attributes': 'Số lượng địa chỉ Email',
                                    'goia': '5',
                                    'goib': '20',
                                    'goic': '50',
                                    'goid': '150',
                                    'goie': '300'
                                },
                                {
                                    'attributes': 'Dung lượng',
                                    'goia': '1',
                                    'goib': '2',
                                    'goic': '3',
                                    'goid': '5',
                                    'goie': '10'
                                },
                                {
                                    'attributes': spcdatagroup.domainKeyDKIM.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.domainKeyDKIM.tip
                                },
                                {
                                    'attributes': spcdatagroup.SPF.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.SPF.tip
                                },
                                {
                                    'attributes': spcdatagroup.catchAllMailOffice.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.catchAllMailOffice.tip
                                },
                                {
                                    'attributes': spcdatagroup.mhsslknPSW.name,
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes,
                                    'tooltip': spcdatagroup.mhsslknPSW.tip
                                },
                                {
                                    'attributes': 'Webmail',
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes
                                },
                                {
                                    'attributes': 'Công cụ quản lý',
                                    'goia': techparamenterdata.yes,
                                    'goib': techparamenterdata.yes,
                                    'goic': techparamenterdata.yes,
                                    'goid': techparamenterdata.yes,
                                    'goie': techparamenterdata.yes
                                },
                                {
                                    'attributes': 'Tần suất gửi mail (email/giờ)',
                                    'goia': '200',
                                    'goib': '200',
                                    'goic': '200',
                                    'goid': '200',
                                    'goie': '200'
                                }
                            ]
                        },
                        faq: [
                            {
                                title: 'Tại sao phải dùng email theo tên miền ?',
                                content: ['Nâng cao uy tín, khẳng định thương hiệu trên internet cho cá nhân và doanh nghiệp của bạn','Quản lý công việc của nhân viên hiệu quả, kiểm tra và điều chỉnh kịp thời khi cần thiết','iNET tối ưu hệ thống giúp cho việc gửi nhận mail diễn ra nhanh chóng, an toàn, tiện lợi'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao không nên dùng email theo tên miền trên Hosting ?',
                                content: ['Email theo tên miền trên hosting là dịch vụ miễn phí kèm theo khi sử dụng hosting vì vậy sẽ không được cam kết đảm bảo hoạt động gửi/nhận mail tốt nhất'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể chuyển dịch vụ email từ nhà cung cấp khác về iNET ?',
                                content: ['Có! Bạn chỉ cần cung cấp các thông tin từ nhà cung cấp cũ cho iNET, chúng tôi sẽ kiểm tra phân tích và chuyển dữ liệu cho bạn hoàn toàn miễn phí về iNET.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể sử dụng email doanh nghiệp để gửi email quảng cáo không ?',
                                content: ['Bạn có thể sử dụng email doanh nghiệp để gửi thư quảng cáo đến khách hàng của mình với số lượng được ghi rõ trong thông số kỹ thuật.','Và luôn tuân thủ nghiên nghặt quy định của các tổ chức chống SPAM quốc tế để đảm bảo tên miền cũng như từ khóa gửi mail không bị liệt kê vào backlist của các tổ chức đó.','Trong trường hợp có các email cố tình gửi spam, hệ thống sẽ tự động suspend email đó và thông báo cho bạn để kiểm tra, xử lý.'],
                                isFirstOpen: false
                            }
                        ],
                        saleoff: "gói Big Mail chỉ với <strong class='txt-sz-24px'>20K</strong>"
                    },
                    emailserver: {
                        title: "Email server riêng",
                        des: "là dịch vụ máy chủ ảo được thiết kế, tối ưu chuyên biệt cho hệ thống email, không chia sẻ tài nguyên với các khách hàng khác.",
                        img: "/public/img/banners/email-server-banner-sv.png",
                        pricetbimg: "/public/img/icons/email-price-table.svg",
                        highlights: [
                            {
                                title: highlightdata.cmoutlook.title,
                                des: highlightdata.cmoutlook.des,
                                img: highlightdata.cmoutlook.img
                            },
                            {
                                title: highlightdata.csvirut.title,
                                des: highlightdata.csvirut.des,
                                img: highlightdata.csvirut.img
                            },
                            {
                                title: highlightdata.ttvtbdd.title,
                                des: highlightdata.ttvtbdd.des,
                                img: highlightdata.ttvtbdd.img
                            },
                            {
                                title: highlightdata.mpcdvviNET.title,
                                des: highlightdata.mpcdvviNET.des,
                                img: highlightdata.mpcdvviNET.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial7day.title,
                                des: highlightdata.trial7day.des,
                                img: highlightdata.trial7day.img
                            }
                        ],
                        specification: [
                            {
                                attributes: "CPU máy chủ mail",
                                tooltip: "",
                                pka: "4 Core"
                            },
                            {
                                attributes: "RAM máy chủ mail",
                                tooltip: "",
                                pka: "4GB"
                            },
                            {
                                attributes: "Dung lượng máy chủ mail",
                                tooltip: "",
                                pka: "160GB"
                            },
                            {
                                attributes: spcdatagroup.domainKeyDKIM.name,
                                tooltip: spcdatagroup.domainKeyDKIM.tip,
                                pka: "yes"
                            },
                            {
                                attributes: spcdatagroup.catchAllMailOffice.name,
                                tooltip: spcdatagroup.catchAllMailOffice.tip,
                                pka: techparamenterdata.yes,
                                pkb: techparamenterdata.yes,
                                pkc: techparamenterdata.yes,
                                pkd: techparamenterdata.yes,
                                pke: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.SPF.name,
                                tooltip: spcdatagroup.SPF.tip,
                                pka: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.catchAllMailOffice.name,
                                tooltip: spcdatagroup.catchAllMailOffice.tip,
                                pka: techparamenterdata.yes
                            },
                            {
                                attributes: spcdatagroup.mhsslknPSW.name,
                                tooltip: spcdatagroup.mhsslknPSW.tip,
                                pka: techparamenterdata.yes
                            },
                            {
                                attributes: "Webmail",
                                tooltip: "",
                                pka: techparamenterdata.yes
                            },
                            {
                                attributes: "Công cụ quản lý",
                                tooltip: "",
                                pka: techparamenterdata.yes
                            },
                            {
                                attributes: "Tần suất gửi mail (email/giờ)",
                                tooltip: "",
                                pka: techparamenterdata.unlimited
                            }
                        ],
                        faq: [
                            {
                                title: 'Tại sao phải dùng email theo tên miền tại iNET ?',
                                content: ['Nâng cao uy tín, khẳng định thương hiệu của doanh nghiệp với khách hàng','Quản lý công việc của nhân viên hiệu quả, kiểm tra và điều chỉnh kịp thời khi cần thiết','iNET tối ưu hệ thống giúp cho việc gửi nhận mail xảy ra nhanh chóng, an toàn, tiện lợi'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Tại sao phải dùng email server riêng ?',
                                content: ['Hệ thống email server riêng được vận hành độc lập trên máy chủ nền tảng điện toán đám mây. Vì thế hệ thống của bạn sẽ không bị ảnh hưởng bởi môi trường shared cũng như không bị ràng buộc giới hạn các tham số như hệ thống email doanh nghiệp'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể chuyển dịch vụ email từ nhà cung cấp khác về iNET ?',
                                content: ['Có! Bạn chỉ cần cung cấp các thông tin từ nhà cung cấp cũ cho iNET, chúng tôi sẽ kiểm tra phân tích và chuyển dữ liệu cho bạn hoàn toàn miễn phí về iNET.'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể sử dụng email doanh nghiệp để gửi email quảng cáo không ?',
                                content: ['Email server riêng không giới hạn tần suất gửi mail nên bạn có thể gửi mail quảng cáo với số lượng nhiều tuy nhiên  cần tuân thủ nghiên nghặt quy định của các tổ chức chống SPAM quốc tế để đảm bảo tên miền cũng như từ khóa gửi mail không bị liệt kê vào backlist của các tổ chức đó. Trong trường hợp bạn lạm dụng gửi spam quá nhiều, IP server của bạn có thể sẽ bị chặn bởi các tổ chức chống SPAM này và email của bạn gửi sẽ rơi vào hòm thư spam với xác suất rất cao. Khi đó bạn cần tham khảo hệ thống email marketing chuyện dụng như Amazon, Sendgrid,...'],
                                isFirstOpen: false
                            }
                        ]
                    }
                },
                vps: {
                    cloudnew: {
                        title: "Cloud VPS",
                        des: "là dịch vụ lưu trữ cung cấp máy chủ ảo chuyên nghiệp trên nền điện toán đám mây. Hệ thống sử dụng công nghệ ảo hóa tiên tiến KVM đảm bảo 100% tài nguyên thật được cấp phát trên VPS cùng với giao diện quản trị đơn giản giúp bạn có thể dễ dàng quản lý",
                        img: "/public/img/banners/cloud-vps-banner-sv.png",
                        pricetbimg: "/public/img/icons/vps-price-table.svg",
                        highlights: [
                            {
                                title: highlightdata.htmmvps.title,
                                des: highlightdata.htmmvps.des,
                                img: highlightdata.htmmvps.img
                            },
                            {
                                title: highlightdata.ktnc.title,
                                des: highlightdata.ktnc.des,
                                img: highlightdata.ktnc.img
                            },
                            {
                                title: highlightdata.dql.title,
                                des: highlightdata.dql.des,
                                img: highlightdata.dql.img
                            },
                            {
                                title: highlightdata.mpcdvviNET.title,
                                des: highlightdata.mpcdvviNET.des,
                                img: highlightdata.mpcdvviNET.img
                            },
                            {
                                title: highlightdata.ht247.title,
                                des: highlightdata.ht247.des,
                                img: highlightdata.ht247.img
                            },
                            {
                                title: highlightdata.trial3day.title,
                                des: highlightdata.trial3day.des,
                                img: highlightdata.trial3day.img
                            }
                        ],
                        specification: [
                            {
                                "title": "CPU",
                                "A": ansyVpsData[0].des.cpu,
                                "B": ansyVpsData[1].des.cpu,
                                "C": ansyVpsData[2].des.cpu,
                                "D": ansyVpsData[3].des.cpu,
                                "E": ansyVpsData[4].des.cpu
                            },
                            {
                                "title": "RAM",
                                "A": ansyVpsData[0].des.ram,
                                "B": ansyVpsData[1].des.ram,
                                "C": ansyVpsData[2].des.ram,
                                "D": ansyVpsData[3].des.ram,
                                "E": ansyVpsData[4].des.ram
                            },
                            {
                                "title": "SSD Storage",
                                "A": ansyVpsData[0].des.ssd.name,
                                "B": ansyVpsData[1].des.ssd.name,
                                "C": ansyVpsData[2].des.ssd.name,
                                "D": ansyVpsData[3].des.ssd.name,
                                "E": ansyVpsData[4].des.ssd.name
                            },
                            {
                                "title": "Băng thông",
                                "A": "Không giới hạn",
                                "B": "Không giới hạn",
                                "C": "Không giới hạn",
                                "D": "Không giới hạn",
                                "E": "Không giới hạn"
                            },
                            {
                                "title": "IP Internet",
                                "A": techparamenterdata.yes,
                                "B": techparamenterdata.yes,
                                "C": techparamenterdata.yes,
                                "D": techparamenterdata.yes,
                                "E": techparamenterdata.yes
                            },
                            {
                                "title": "Kết nối từ xa",
                                "A": techparamenterdata.yes,
                                "B": techparamenterdata.yes,
                                "C": techparamenterdata.yes,
                                "D": techparamenterdata.yes,
                                "E": techparamenterdata.yes
                            },
                            {
                                "title": vpsSpecification.tools.subtitle,
                                "A": vpsSpecification.tools.value,
                                "B": vpsSpecification.tools.value,
                                "C": vpsSpecification.tools.value,
                                "D": vpsSpecification.tools.value,
                                "E": vpsSpecification.tools.value
                            },
                            {
                                "title": vpsSpecification.techVps.subtitle,
                                "A": vpsSpecification.techVps.value,
                                "B": vpsSpecification.techVps.value,
                                "C": vpsSpecification.techVps.value,
                                "D": vpsSpecification.techVps.value,
                                "E": vpsSpecification.techVps.value
                            },
                            {
                                "title": vpsSpecification.dataBackUp.subtitle,
                                "A": vpsSpecification.dataBackUp.value,
                                "B": vpsSpecification.dataBackUp.value,
                                "C": vpsSpecification.dataBackUp.value,
                                "D": vpsSpecification.dataBackUp.value,
                                "E": vpsSpecification.dataBackUp.value
                            }
                        ],
                        faq: [
                            {
                                title: 'Cloud VPS có gì khác so với Shared Hosting?',
                                content: ['Với Shared Hosting, Website của bạn được đặt trên máy chủ cùng với khoảng vài trăm đến vài nghìn Website khác và chia sẻ chung tài nguyên từ máy chủ đó như bộ nhớ RAM và CPU. Còn VPS là một hệ thống riêng biệt được tạo ra bằng cách phân chia máy chủ vật lý với CPU riêng, dung lượng RAM riêng…và người dùng có toàn quyền quản trị cao nhất.'],
                                isFirstOpen: true
                            },
                            {
                                title: 'Tôi không hiểu sâu về kỹ thuật, vậy tôi có nên sử dụng dịch vụ VPS không ?',
                                content: ['Khi đăng ký Cloud VPS tại iNET bạn sẽ được tặng kèm các phần mềm quản trị Directadmin và cPanel bản quyền. Với giao diện quản lý thân thiện của Directadmin/cPanel bạn sẽ dễ dàng quản trị VPS của mình. Ngoài ra, iNET cung cấp dịch vụ quản trị VPS bạn có thể tham khảo thêm từ tư vấn viên'],
                                isFirstOpen: false
                            },
                            {
                                title: 'Tôi có thể chuyển dịch vụ từ nhà cung cấp khác về iNET ?',
                                content: ['Có! Bạn chỉ cần cung cấp các thông tin từ nhà cung cấp cũ cho iNET, chúng tôi sẽ kiểm tra phân tích và chuyển dữ liệu cho bạn hoàn toàn miễn phí về iNET.'],
                                isFirstOpen: false
                            }
                        ]
                    }
                },
                ssl: sslService
            };
            return dataMock;
        },
        prtbdatamock: function() {
            var diradm = "Tặng DirectAdmin",
                dircpn = "Tặng Cpanel",
                urldiradm = "/public/img/icons/directadmin.png",
                urldircpn = "/public/img/icons/cpanel-gifts.png",
                dirheight = 38,
                cpnheight = 25;
            var tooltipdatamock = {
                bandwidth: $sce.trustAsHtml('Chúng tôi không giới hạn băng thông, dung lượng với mục đích hỗ trợ khách hàng sử dụng dịch vụ tốt nhất, tránh bị gián đoạn khi tao tác vận hành website và phù hợp với các điều khoản trong <a href="https://inet.vn/thoa-thuan-su-dung" target="_blank">Thỏa thuận dịch vụ</a> của iNET.  Nếu việc sử dụng băng thông, dung lượng lưu trữ website của bạn có nguy cơ ảnh hưởng đến hiệu xuất, độ ổn định hay thời gian hoạt động của hệ thống chúng tôi sẽ thông báo, tư vấn đến bạn sử dụng một dịch vụ khác phù hợp hơn hoặc có thể tạm ngưng dịch vụ của bạn nếu gây ảnh hưởng nghiêm trọng. Các trường hợp vi phạm chính sách của chúng tôi thông thường sử dụng Hosting để chia sẽ, lưu trữ hoặc truyền tải các tệp tin, file dữ liệu media'),
                sslfree: $sce.trustAsHtml('iNET cung cấp SSL miễn phí  của <a href="https://tintuc.inet.vn/inet-chinh-thuc-ho-tro-ssl-mien-phi-tu-lets-encrypt.html" target="_blank">SSL Let\'s Encrypt</a> trên các gói hosting. Sử dụng SSL website sẽ được bảo mật và thân thiện hơn với các đánh giá thứ hạng của google'),
                ssd: $sce.trustAsHtml('Các gói hosting tại iNET được thiết kế nhằm mục đích cung cấp môi trường cho các cá nhân, doanh nghiệp, tổ chức có nhu cầu hoạt động website quy mô vừa và nhỏ. Chúng tôi không giới hạn băng thông, dung lượng với mục đích hỗ trợ khách hàng sử dụng dịch vụ tốt nhất, tránh bị gián đoạn khi tao tác vận hành website và phù hợp với các điều khoản trong <a href="https://inet.vn/thoa-thuan-su-dung" target="_blank">Thỏa thuận dịch vụ</a> của iNET.  Nếu việc sử dụng băng thông, dung lượng lưu trữ website của bạn có nguy cơ ảnh hưởng đến hiệu xuất, độ ổn định hay thời gian hoạt động của hệ thống chúng tôi sẽ thông báo, tư vấn đến bạn sử dụng một dịch vụ khác phù hợp hơn hoặc có thể tạm ngưng dịch vụ của bạn nếu gây ảnh hưởng nghiêm trọng. Các trường hợp vi phạm chính sách của chúng tôi thông thường sử dụng Hosting để chia sẽ, lưu trữ hơặc truyền tải các tệp tin, file dữ liệu media')
            };
            var data = {
                linuxnew: [
                    {
                        des: {
                            sl: "1 website",
                            ssd: {
                                name: "20GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            sl: "5 website",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            sl: "Không giới hạn website",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    }
                ],
                wordpressnew: [
                    {
                        des: {
                            sl: "1 website",
                            ssd: {
                                name: "20GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            sl: "5 website",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            sl: "Không giới hạn website",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    }
                ],
                seoclassc: [
                    {
                        des: {
                            ip: "6",
                            classC: "2",
                            ssd: {
                                name: "20GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ip: "12",
                            classC: "4",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ip: "24",
                            classC: "8",
                            ssd: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.ssd
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    }
                ],
                reseller: [
                    {
                        des: {
                            ssd: {
                                name: "10GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "20GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "30GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "40GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "50GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    }
                ],
                cloudnew: [
                    {
                        des: {
                            cpu: "1 Core",
                            ram: "1 GB",
                            ssd: {
                                name: "20 GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            pkt: 0
                        },
                        gift: {
                            title: diradm,
                            urlimg: urldiradm,
                            height: dirheight
                        }
                    },
                    {
                        des: {
                            cpu: "2 Core",
                            ram: "2 GB",
                            ssd: {
                                name: "40 GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            pkt: 0
                        },
                        gift: {
                            "title": diradm,
                            "urlimg": urldiradm,
                            "height": dirheight
                        }
                    },
                    {
                        des: {
                            cpu: "4 Core",
                            ram: "4 GB",
                            ssd: {
                                name: "60 GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            pkt: 0
                        },
                        gift: {
                            "title": dircpn,
                            "urlimg": urldircpn,
                            "height": cpnheight
                        }
                    },
                    {
                        des: {
                            cpu: "6 Core",
                            ram: "8 GB",
                            ssd: {
                                name: "80 GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            pkt: 0
                        },
                        gift: {
                            "title": dircpn,
                            "urlimg": urldircpn,
                            "height": cpnheight
                        }
                    },
                    {
                        des: {
                            cpu: "8 Core",
                            ram: "12 GB",
                            ssd: {
                                name: "120 GB"
                            },
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            pkt: 0
                        },
                        gift: {
                            "title": dircpn,
                            "urlimg": urldircpn,
                            "height": cpnheight
                        }
                    }
                ],
                business: [
                    {
                        des: {
                            ssd: {
                                name: "10GB"
                            },
                            cpu: "2 Core",
                            ram: "2 GB",
                            ipown: "Không",
                            sl: "Không giới hạn website",
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "20GB"
                            },
                            cpu: "4 Core",
                            ram: "4 GB",
                            ipown: "Không",
                            sl: "Không giới hạn website",
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    },
                    {
                        des: {
                            ssd: {
                                name: "40GB"
                            },
                            cpu: "6 Core",
                            ram: "6 GB",
                            ipown: "1 IP",
                            sl: "Không giới hạn website",
                            bsw: {
                                name: "Không giới hạn",
                                tip: tooltipdatamock.bandwidth
                            },
                            ssl: {
                                name: "Miễn phí",
                                tip: tooltipdatamock.sslfree
                            }
                        }
                    }
                ]
            };
            return data;
        }
    }
}