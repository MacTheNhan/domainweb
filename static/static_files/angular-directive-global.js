"use strict";
var directiveApp = angular.module("directiveGlobalApp", []);
directiveApp.directive('inMenu2Lv', inMenu2Lv);
directiveApp.directive('focus', focus);
directiveApp.directive('loadingAnimate', loadingAnimate);
directiveApp.directive("owlCarousel", owlCarousel);
directiveApp.directive('owlCarouselItem', [owlCarouselItem]);
directiveApp.directive('message', message);
directiveApp.directive('countdown', countdown);
directiveApp.directive('inetTextAnimation', inetTextAnimation);
directiveApp.directive("notify", notify);
directiveApp.directive("pagination", pagination);
directiveApp.directive("domainHeaderResults", domainHeaderResults);
directiveApp.directive("pricing", pricing);
directiveApp.directive('fixedScrollBody', fixedScrollBody);
directiveApp.directive("couponCode", couponCode);
directiveApp.directive("iframeAutoHeight", iframeAutoHeight);
directiveApp.directive("anyOtherClick", anyOtherClick);
directiveApp.directive("mousePointerEff", mousePointerEff);
directiveApp.directive("mnHoverEvent", mnHoverEvent);
directiveApp.directive("autoOnOffCampain", autoOnOffCampain);
directiveApp.directive("mnClickEvent", mnClickEvent);



mnClickEvent.$inject = [];

function mnClickEvent() {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem.on('click', function (e) {
                if(e.currentTarget.className.indexOf('open') > -1) {
                    applyLeave();
                }
                else {
                    applyEnter();
                }
            });
            angular.element(document).on('click', applyLeave);
        }
    }
}

//Global function
function applyEnter(){
    angular.element("#main-content").append("<div id='focusMainMenu'></div>");
}

function applyLeave() {
    angular.element("#focusMainMenu").remove();
}

//Mobile footer menu
inMenu2Lv.$inject = [];
function inMenu2Lv() {
    return {
        restric: 'ACE',
        link: function (scope, element, attrs) {
            scope.menuClick = function (index, dataArr) {
                dataArr[index].active = !dataArr[index].active;
                collapseAnother(index, dataArr);
            };

            var collapseAnother = function (index, dataArr) {
                for (var i = 0; i < dataArr.length; i++) {
                    if (i !== index) {
                        dataArr[i].active = false;
                    }
                }
            };
        }
    }
}

//Focus input
focus.$inject = ['$timeout'];
function focus(timeout) {
    return {
        restric: 'A',
        scope: {
            trigger: '@focus'
        },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === "true") {
                    timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
}

//Loading animate global
loadingAnimate.$inject = ['serviceApiGlobal', '$timeout', '$window'];
function loadingAnimate(serviceApiGlobal, $timeout, $window) {
    return {
        restrict: "E",
        scope: {
            mesg: '@'
        },
        template: '<div class="logo-loading">' +
        '<img src="/public/img/svg/iNET-loading.svg" height="45" ng-if="!show">' +
        '<div ng-if="show" class="loading-error text-center">' +
        '<div class="alert alert-danger"><p ng-bind-html="rdhtml(alerts)"></p></div>' +
        '<div class="timer">Chúng tôi sẽ tự động kết nối lại sau <strong class="txt-red-c61818" ng-bind="countDown + \' giây\'"></strong></div>' +
        '</div>' +
        '</div>',
        replace: true,
        link: function (scope, element, attr) {
            scope.rdhtml = function (html) {
                return serviceApiGlobal.renderHtml(html);
            };
            scope.countDown = 10;
            var timer = function () {
                $timeout(function() {
                    scope.countDown--;
                    if(scope.countDown == 0) {
                        autoRefreshPage();
                    }
                    timer();
                }, 1000);
            };
            scope.show = false;
            function notify() {
                scope.show = true;
                scope.alerts = "Lỗi kết nối với máy chủ <strong>Server Tigerbui 1987</strong>";
                timer();
            }
            $timeout(notify, 5*3000);
            function autoRefreshPage() {
                $window.location.reload();
            }
        }
    }
}
//Slider Owl Carousel
owlCarousel.$inject = [];
function owlCarousel() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function (element) {
                // provide any default options you want
                var defaultOptions = {};
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
}

owlCarouselItem.$inject = [];
function owlCarouselItem() {
    return {
        restrict: 'A',
        transclude: false,
        link: function (scope, element) {
            // wait for the last item in the ng-repeat then call init
            if (scope.$last) {
                scope.initCarousel(element.parent());
            }
            else {
                return;
            }
        }
    };
}

//Message alert global
message.$inject = ['$timeout'];

function message(timeout) {
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        template: '<div ng-show="show"><div ng-transclude></div></div>',
        link: function (scope, element, attrs) {
            scope.show = true;
            timeout(function () {
                scope.show = false;
            }, 1000)
        }
    }
}

//Đồng hồ đếm ngược dành cho landing page khuyến mãi
countdown.$inject = ['serviceApiGlobal', '$interval'];
function countdown(serviceApiGlobal, $interval) {
    return {
        restrict: 'A',
        scope: {date: '@', text: '@'},
        replace: true,
        template: '<div class="coutdown-wrap">' +
        '<div class="time-down" ng-if="countdown.day > 0">' +
        '<strong ng-bind="text"></strong> ' +
        '<strong class="day" ng-bind="countdown.day + \' Ngày \'"></strong>' +
        '<strong class="hour" ng-bind="countdown.hour"></strong>' +
        '<strong class="hour" ng-bind="countdown.minute"></strong>' +
        '<strong class="hour" ng-bind="countdown.second"></strong>' +
        '</div>' +
        '</div>',
        link: function (scope, element) {
            var future;
            future = new Date(scope.date);
            $interval(function () {
                var diff;
                diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                return scope.countdown = serviceApiGlobal.dhms(diff);
            }, 1000);
        }
    };
}

//Tự động mở và tắt thời gian chạy chiến dịch khi được cài đặt
autoOnOffCampain.$inject = ['serviceApiGlobal', '$interval'];
function autoOnOffCampain(serviceApiGlobal, $interval) {
    return {
        restrict: 'A',
        scope: {
            date: '@',
            saleOff: '=',
            maxDay: '='
        },
        link: function (scope, element) {
            var future, stop;
            future = new Date(scope.date);
            if ( angular.isDefined(stop) ) {
                return;
            }

            stop = $interval(function () {
                var diff, timecheck;
                diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                timecheck = serviceApiGlobal.dhms(diff);
                if(timecheck.day < 0) {
                    stopTime();
                }
                else {
                    startTime(timecheck);
                }
            }, 780);

            function stopTime() {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            }
            function startTime(t) {
                if(scope.maxDay !== undefined && scope.maxDay !== '') {
                    if(t.day <= scope.maxDay) {
                        scope.$emit('saleVal', scope.saleOff);
                    }
                }
            }
        }
    }
}

//Hiệu ứng text animate
inetTextAnimation.$inject = [];
function inetTextAnimation() {
    return {
        restrict: 'E',
        template: '{{text}}',
        scope: {
            class: "@",
            text: "@"
        },
        controller: function ($scope, $element, $attrs) {
            $element.addClass($scope.class);
        }
    };
}

//Notify on site
notify.$inject = [];
function notify() {
    return {
        restrict: "AE",
        link: function (scope, element, attr) {
            element.css("display", "block");
            var times = attr.timeout;
            if (times) {
                //config setimeout for notifiy
                setTimeout(function () {
                    settimeremove(element);
                }, times);
            }
            function settimeremove(e) {
                $(e).fadeOut(300);
            }
        }
    }
}

//Search tên miền chung
domainHeaderResults.$inject = [];
function domainHeaderResults() {
    return {
        template: "<div class='notavailable clearfix'>" +
        "<i ng-class='{\"ion-sad txt-grey-b6\": whois.domainName && !available, \"ion-android-happy txt-green-1eba5c\": whois.domainName && available}' ng-cloak></i> " +
        "<strong class='domainName' ng-class='{\"txt-red-c61818\": !available}' ng-bind='whois.domainName'></strong>" +
        " <small ng-if='MSG != \"\"' ng-bind-html='rdhtml(MSG)'></small> " +
        "<a class='btn btn-default margin-right-10px' ng-class='{\"pull-right\": !detectMobile}' ng-if='domainCode == 0' ng-href='http://whois.inet.vn/whois?domain={{whois.domainName}}' title='{{whois.domainName}}' target='_blank'>whois</a>" +
        "</div>"
    }
}

//Giá đi kèm khi tìm kiếm tên miền
pricing.$inject = [];
function pricing() {
    return {
        template: '<div class="price-group" ng-if="whois.domainName.indexOf(\'.vn\') > -1"><p class="pkt price">' +
        '<span class="txt-fees" ng-bind="feesinitialization | translate"></span> ' +
        '<span class="group-fees">' +
        '<span class="pricestrike" ng-show="whois.regOrigin > whois.reg">{{whois.regOrigin | currency : "\u20ab":0}}</span>' +
        '<span class="price" ng-if="whois.reg">{{whois.reg | currency : "\u20ab":0}}</span>' +
        '<span class="price" ng-if="whois.feeReg">{{whois.feeReg | currency : "\u20ab":0}}</span>' +
        '</span>' +
        '</p>' +
        '<p class="pdt price">' +
        '<span class="txt-fees" ng-bind="maintenacefeesonenew | translate"></span> ' +
        '<span class="group-fees">' +
        '<span class="pricestrike" ng-show="whois.renOrigin > whois.ren">{{whois.renOrigin | currency : "\u20ab":0}}</span> ' +
        '<span class="price" ng-if="whois.ren">{{whois.ren | currency : "\u20ab":0}}</span>' +
        '<span class="price" ng-if="whois.feeRen">{{whois.feeRen | currency : "\u20ab":0}}</span>' +
        '</span>' +
        '</p></div>' +
        '<p class="ptt price group-fees">' +
        '<span class="pricestrike" ng-show="whois.feeOrigin > whois.fee">{{whois.feeOrigin | currency : "\u20ab":0}}</span> ' +
        '<strong class="maintainingfee one">{{whois.fee | currency : "\u20ab":0}}</strong>' +
        '</p>',
        link: function (scope, element, attr) {
            scope.feesinitialization = "Khởi tạo";
            scope.maintenacefeesonenew = "Duy trì/năm";
        }
    }
}

//Mã coupon
couponCode.$inject = [];
function couponCode() {
    return {
        template: '<p ng-repeat="cp in couponMock">' +
        '<strong ng-bind="cp.code"></strong>: ' +
        '<span ng-bind="cp.des"></span>' +
        '</p>'
    }
}

//Click popup select option hoặc modal trên mobile không bị scroll body bên dưới
anyOtherClick.$inject = ['$document', '$parse'];
function anyOtherClick($document, $parse) {
    return {
        link: function (scope, element, attr) {
            console.log('element');
            var getBody = angular.element('body');
            var anyOtherBtn = attr['anyOtherClick'];
            var docCkHandler = function (event) {
                getBody.css({'overflow-y': 'scroll'});
                var eventOutsideTarget = (element[0] !== event.target) && (0 === element.find(event.target).length);
                if (!eventOutsideTarget) {
                    scope.$apply(anyOtherBtn);
                    getBody.css('overflow', '');
                }
            };

            $document.on("click", docCkHandler);
            scope.$on("$destroy", function () {
                $document.off("click", docCkHandler);
            });
        }
    }
}
//Fixed scroll cho một số trường hợp như popup hoặc kịch bản landing page
fixedScrollBody.$inject = [];
function fixedScrollBody() {
    return {
        restrict: 'AE',
        scope: {
            fixed: '@fixedStatus'
        },
        link: function (scope, elem, attr) {
            var getBody = angular.element('body');
            if(scope.fixed == 'true') {
                getBody.css({
                    'overflow': 'hidden'
                });
            }
        }
    }
}

//Mouse pointer
mousePointerEff.$inject = ['$window'];
function mousePointerEff($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            var movementStrength = 25;
            var window = $window;
            var height = movementStrength / $(window).height();
            var width = movementStrength / $(window).width();
            elem.mousemove(function(e){
                var pageX = e.pageX - ($(window).width() / 2);
                var pageY = e.pageY - ($(window).height() / 2);
                var newvalueX = width * pageX * -1 - 5;
                var newvalueY = height * pageY * -1 - 10;
                elem.css("background-position", newvalueX+"px "+newvalueY+"px");
            });
        }
    }
}

//Hover menu event
mnHoverEvent.$inject = [];
function mnHoverEvent() {
    return {
        restrict: 'A',
        scope: {
            ngClass: "=ngClass"
        },
        link: function (scope, elem, attr) {
            if(scope.ngClass['is-dropdown'] == true) {
                elem.on('mouseenter', applyEnter);
                elem.on('mouseleave', applyLeave);
            }

            function applyEnter(){
                angular.element("#main-content").append("<div id='focusMainMenu'></div>");
            }

            function applyLeave() {
                angular.element("#focusMainMenu").remove();
            }
        }
    }
}

pagination.$inject = ['$timeout'];

function pagination($timeout) {
    return {
        restrict: 'AE',
        scope: {
            "ngModel": "=",
            "totalItems": "=",
            "itemsPerPage": "=",
            "ngChange": "&"
        },
        template: "<ul uib-pagination total-items='totalItems' ng-model='ngModel' ng-change='valueChange()'" +
        "items-per-page='itemsPerPage'" +
        " class='pagination-sm' previous-text='&lsaquo;' next-text='&rsaquo;' first-text='&laquo;' last-text='&raquo;'" +
        " boundary-links='true' force-ellipses='true' max-size='10'></ul>",
        link: function ($scope, $element, $attrs, ngModel)
        {
            $scope.valueChange = function()
            {
                $timeout(function()
                {
                    if ($attrs.ngChange) $scope.$parent.$eval($attrs.ngChange);
                }, 0);
            };
        }
    };
}

iframeAutoHeight.$inject = [];
function iframeAutoHeight() {
    return {
        restrict: "A",
        link: function (scope, elem, attr) {
            if (!document.addEventListener) {
                return;
            }

            var iframe = elem[0];

            function init_iframe() {
                var height = Math.max(iframe.contentWindow.document.body.scrollHeight, iframe.contentWindow.document.body.offsetHeight, iframe.contentWindow.document.documentElement.clientHeight, iframe.contentWindow.document.documentElement.scrollHeight, iframe.contentWindow.document.documentElement.offsetHeight);
                iframe.style.height = height + 'px';
            }

            function init() {
                if (iframe) {

                    iframe.addEventListener('load', init_iframe);

                    try {
                        if (iframe.contentWindow.document.readyState !== 'loading') {
                            window.setTimeout(init_iframe);
                        }
                    } catch (e) {
                        console.log(e);
                    }

                }
            }

            if (document.readyState !== 'loading') {
                window.setTimeout(init); // Handle asynchronously
            } else {
                document.addEventListener('DOMContentLoaded', init);
            }

        }
    }
}

directiveApp.directive('autoTop', autoTop);

autoTop.$inject = ['$window'];

function autoTop($window) {
    return {
        restrict: "AE",
        replace: true,
        scope: {
            iconName: '@backTopIcon'
        },
        template: '<div><a href="javascript:void(0)" style="color: #f2f2f2" id="backTop"><i class="{{iconName}}"></i></a></div>',
        link: function (scope, elem, attr) {
            var elemid = elem[0];
            var window = angular.element($window);
            window.bind('scroll', function (e) {
                if(window.scrollTop() > 0) {
                    $(elemid).css({
                        'display': 'flex',
                        'backgroundColor': '#727272'
                    });
                }
                else {
                    $(elemid).css('display', 'none');
                }
            });
            $(elemid).click(function () {
                $('html,body').animate({scrollTop: 0}, 1000);
            });
        }
    }
}

directiveApp.directive('iSliderCarousel', iSliderCarousel);

iSliderCarousel.$inject = ['$timeout'];

function iSliderCarousel($timeout) {
    return {
        link: function (scope, elem, attr) {
            elem.css('overflow', 'hidden');
            $timeout(function () {
                var wel = elem[0].clientWidth;
                var citem = elem[0].querySelectorAll('.item');
                var getWelm = [];
                for(var i in citem) {
                    if(citem[i].clientWidth !== undefined) {
                        getWelm.push($(citem[i]).outerWidth());
                    }
                }
                //Total width item in list-item
                var total = getWelm.reduce(function(sum, value) {
                    return sum + value;
                }, 0);
                if(wel < total) {
                    elem.css('justifyContent', 'baseline');
                    elem.after('<div class="i-slider-control"><div class="i-btn-group">' +
                        '<a href="javascript:void(0)" class="prev"><i class="ion-ios-arrow-back"></i></a>' +
                        '<a href="javascript:void(0)" class="next"><i class="ion-ios-arrow-forward"></i></a>' +
                        '</div></div>');
                }
            }, 1500);
        }
    }
}

//Demo event special
directiveApp.directive('eventSpecials', eventSpecials);

eventSpecials.$inject = ['$timeout', '$window'];

function eventSpecials($timeout, $window) {
    return {
        restrict: 'AE',
        template: '<canvas width="100%" height="100%" class="snow"></canvas>',
        replace: true,
        link: function (scope, element, attr) {
            var imgdir = '/public/img/event/tet/mai-0.png';
            var window = $window;
            element.css('position', 'absolute');

            var defaults = {
                speed: 0.2,
                interaction: true,
                size: 2,
                count: 100,
                opacity: 0,
                color: "#ffffff",
                windPower: 0,
                image: imgdir
            };
            var settings = $.extend({}, defaults),
                el = element,
                flakes = [],
                canvas = element[0],
                ctx = canvas.getContext("2d"),
                flakeCount = settings.count,
                mX = -100,
                mY = -100;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            (function() {
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                window.requestAnimationFrame = requestAnimationFrame;
            })();

            function snow() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < flakeCount; i++) {
                    var flake = flakes[i],
                        x = mX,
                        y = mY,
                        minDist = 100,
                        x2 = flake.x,
                        y2 = flake.y;

                    var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                        dx = x2 - x,
                        dy = y2 - y;

                    if (dist < minDist) {
                        var force = minDist / (dist * dist),
                            xcomp = (x - x2) / dist,
                            ycomp = (y - y2) / dist,
                            deltaV = force / 2;

                        flake.velX -= deltaV * xcomp;
                        flake.velY -= deltaV * ycomp;

                    } else {
                        flake.velX *= .98;
                        if (flake.velY <= flake.speed) {
                            flake.velY = flake.speed
                        }

                        switch (settings.windPower) {
                            case false:
                                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                                break;

                            case 0:
                                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                                break;
                            default:
                                flake.velX += 0.01 + (settings.windPower/100);
                        }
                    }

                    var s = settings.color;
                    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
                    var matches = patt.exec(s);
                    var rgb = parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16);


                    flake.y += flake.velY;
                    flake.x += flake.velX;

                    if (flake.y >= canvas.height || flake.y <= 0) {
                        reset(flake);
                    }


                    if (flake.x >= canvas.width || flake.x <= 0) {
                        reset(flake);
                    }
                    if (settings.image == false) {
                        ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")";
                        ctx.beginPath();
                        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                        ctx.fill();
                    } else {

                        ctx.drawImage($("img#lis_flake").get(0), flake.x, flake.y, flake.size * 2, flake.size * 2);
                    }

                }
                requestAnimationFrame(snow);
            }

            function reset(flake) {

                if (settings.windPower == false || settings.windPower == 0) {
                    flake.x = Math.floor(Math.random() * canvas.width);
                    flake.y = 0;
                } else {
                    if (settings.windPower > 0) {
                        var xarray = Array(Math.floor(Math.random() * canvas.width), 0);
                        var yarray = Array(0, Math.floor(Math.random() * canvas.height));
                        var allarray = Array(xarray, yarray);

                        var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

                        flake.x = selected_array[0];
                        flake.y = selected_array[1];
                    } else {
                        var xarray = Array(Math.floor(Math.random() * canvas.width),0);
                        var yarray = Array(canvas.width, Math.floor(Math.random() * canvas.height));
                        var allarray = Array(xarray, yarray);

                        var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

                        flake.x = selected_array[0];
                        flake.y = selected_array[1];
                    }
                }

                flake.size = (Math.random() * 3) + settings.size;
                flake.speed = (Math.random() * 1) + settings.speed;
                flake.velY = flake.speed;
                flake.velX = 0;
                flake.opacity = (Math.random() * 0.5) + settings.opacity;
            }
            function init() {
                for (var i = 0; i < flakeCount; i++) {
                    var x = Math.floor(Math.random() * canvas.width),
                        y = Math.floor(Math.random() * canvas.height),
                        size = (Math.random() * 3)  + settings.size,
                        speed = (Math.random() * 1) + settings.speed,
                        opacity = (Math.random() * 0.5) + settings.opacity;

                    flakes.push({
                        speed: speed,
                        velY: speed,
                        velX: 0,
                        x: x,
                        y: y,
                        size: size,
                        stepSize: (Math.random()) / 30,
                        step: 0,
                        angle: 180,
                        opacity: opacity
                    });
                }

                snow();
            }

            if (settings.image !== false) {
                $("<img src='"+settings.image+"' style='display: none' id='lis_flake'>").prependTo("body")
            }

            init();
            //Khi cua so trình duyệt hoặc window thay đổi màn hình
            $(window).resize(function() {
                canvas.width = this.innerWidth;
                canvas.height = this.innerHeight;
                $('#snowCover').remove();
                $('#merryCbanner').remove();
                // $timeout(checkBanner(this.innerWidth), 250);
            });
            $(window).load(function () {
                canvas.width = this.innerWidth;
                canvas.height = this.innerHeight;
                // $timeout(checkBanner(this.innerWidth), 250);
            });

            if (settings.interaction == true) {
                canvas.addEventListener("mousemove", function(e) {
                    mX = e.clientX,
                        mY = e.clientY;
                });
            }

            function checkBanner(wdw) {
                var getIdBn = angular.element(document).find('#banner');
                if(getIdBn !== undefined) {
                    var getIdBnH = $(getIdBn).innerHeight();
                    $('<div id="snowCover"></div>').insertAfter(getIdBn);
                    $('#snowCover').css({
                        background: 'transparent url("/public/img/event/merry-christmas/snow_cover.png") repeat-x center center',
                        height: '38px',
                        width: '100%',
                        position: 'absolute',
                        top: getIdBnH - 20 + 'px',
                        zIndex: '2'
                    });
                    if(wdw < 960) {
                        $('<div id="merryCbanner"><a href="/khuyen-mai"><img src="/public/img/event/merry-christmas/mobile_merry-christmas(900x200).png"/></a></div>').insertBefore($('#snowCover'));
                    }
                }
            }
        }
    }
}

directiveApp.directive('tableServiceManager', tableServiceManager);

tableServiceManager.$inject = [];

function tableServiceManager() {
    return {
        scope: {
            tbSvEvent: '='
        },
        link: function (scope, element, attr) {
            var getRow = element[0].rows;
            scope.$watch('tbSvEvent', function (nVl, oVl) {
                if(nVl == true) {
                    $(getRow[1]).after($('<tr class="row-child"><td colspan="4"><table class="table"><tbody><tr><td class="text-center"><a href="javascript:void(0)" class="btn btn-default">Xây dựng trang web</a><a href="javascript:void(0)" class="btn btn-default">Thiết lập một tài khoản Email</a><a href="javascript:void(0)" class="btn btn-default">Thêm quền riêng tư</a></td></tr></tbody></table></td></tr>'));
                }
                else {
                    angular.element(element).find('.row-child').remove();
                }
            });
        }
    }
}