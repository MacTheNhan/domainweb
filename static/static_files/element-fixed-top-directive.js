"use strict";

directiveApp.directive('inetNavbarFixedTop', inetNavbarFixedTop);

inetNavbarFixedTop.$inject = ['$window', '$timeout'];

function inetNavbarFixedTop($window, $timeout) {
    return {
        scope: {
            idClassHide: '@'
        },
        link: function (scope, element, attr) {
            var countElm,offSetTop = {elmTop: 0},i, objId = {};
            var getWvl = angular.element($window);
            var addClassNameElmAfter = element[0].className;
            var getfooter = angular.element('body').find('footer');
            element.addClass('inet-fixed-static');
            //Thêm id vào các element để kiểm tra tính trùng lặp và fixed bug
            scope.getWindowDimensions = function () {
                return {
                    'h': getWvl.height(),
                    'w': getWvl.width(),
                    'y': getWvl.scrollTop()
                };
            };

            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                if(newValue.w !== oldValue.w) {
                    $timeout(getWElm, 200);
                }
                wScrollTop(newValue.y);
            }, true);

            var queryElm = angular.element(document).find('.inet-fixed-static');
            queryElm.each(function (p1, p2) {
                countElm = p1 + 1;
            });
            element.attr('id', 'fixed-id-'+countElm);

            $timeout(function () {
                removeIdDuplicateInPage();
            }, 300);

            getWvl.on('resize', function () {
                scope.$apply();
            });
            getWvl.on('scroll', function () {
                scope.$apply();
            });

            $timeout(getWElm, 400);

            function getWElm() {
                getMaxHeight(element);
                offSetTop = getOffsetTop(element);
                getMaxWidth(element);
            }

            function removeIdDuplicateInPage() {
                $('[id]').each(function (i, v) {
                    var ids = $('[id="'+this.id+'"]');
                    //Tìm kiếm các ID bị trùng lặp và đưa ra cảnh báo ở console
                    if(ids.length > 1 && ids[0] === this){
                        console.warn('Multiple IDs #'+this.id);
                    }
                    //Xóa đi một Id nếu Id bị trùng lặp
                    if(objId[this.id]){
                        $(this).remove();
                        console.log('Đã remove ID' + this.id + ' bị trùng lặp');
                    }
                    else {
                        objId[this.id] = true;
                    }
                });
            }

            function getMaxWidth(element) {
                var elmId = $('#'+element[0].id);
                elmId.removeAttr('style');
                var getElmAfter = $('#add-height-elm-'+countElm).innerWidth();
                if(getElmAfter == null) {
                    if(elmId.innerWidth() > 0) {
                        elmId.css('width', elmId.innerWidth() + 'px');
                    }
                    else if(elmId[0] !==undefined) {
                        elmId.css('width', elmId[0].parentNode.clientWidth + 'px');
                    }
                }
                else {
                    elmId.css('width', getElmAfter + 'px');
                }
            }

            function getMaxHeight(element) {
                return $('#'+element[0].id).innerHeight();
            }

            function getOffsetTop(element) {
                var maxOffsetTop = {};
                var getElmAfter = $('#add-height-elm-'+countElm).offset();
                scope.idClassHide == undefined ? maxOffsetTop.footerTop = getfooter[0].offsetTop : maxOffsetTop.footerTop = $(scope.idClassHide)[0].offsetTop;
                if(getElmAfter == undefined) {
                    var getMaxNumber = $('#'+element[0].id).offset() !== undefined ? $('#'+element[0].id).offset().top : 0;
                    if(getMaxNumber > 0) {
                        maxOffsetTop.elmTop = getMaxNumber;
                    }
                    else if($('#'+element[0].id)[0] !== undefined) {
                        maxOffsetTop.elmTop = $('#'+element[0].id)[0].parentNode.offsetTop;
                    }
                }
                else {
                    maxOffsetTop.elmTop = getElmAfter.top;
                }

                return maxOffsetTop;
            }

            function wScrollTop(wscroll) {
                if(wscroll > offSetTop.elmTop) {
                    element.addClass('inet-fixed-top').css('zIndex', 1000-Math.round(element[0].childElementCount));
                    if($('#add-height-elm-'+countElm).length === 0) {
                        element.after('<div id="add-height-elm-'+countElm+'"></div>');
                    }
                    $('#add-height-elm-'+countElm).addClass(addClassNameElmAfter).css('height', getMaxHeight(element) + 'px');
                }
                else {
                    element.removeClass('inet-fixed-top');
                    $('#add-height-elm-'+countElm).remove();
                }
                if(wscroll > offSetTop.footerTop) {
                    element.css('top', 0-getMaxHeight(element) + 'px');
                }
                else {
                    element.css('top', '0px');
                }
                if(getMaxHeight(element) > 0) {
                    offSetTop = getOffsetTop(element);
                }
            }
        }
    }
}

directiveApp.directive("scrollUpDown", scrollUpDown);

//Sự kiện scroll cho trang landing page của Sale
scrollUpDown.$inject = ['$window', '$timeout'];
function scrollUpDown($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            var lastScroll = 0;
            var getHeaderMenu = angular.element(document).find('.bottom-heder-wrap');
            function elementScroll() {
                angular.element($window).scroll(function(event){
                    var heigthElm = $(elem[0]).outerHeight();
                    //Sets the current scroll position
                    if(getHeaderMenu.length > 0) {
                        heigthElm = getHeaderMenu[0].clientHeight;
                    }
                    else {
                        heigthElm = 0;
                    }
                    var st = $(this).scrollTop();
                    //Determines up-or-down scrolling
                    $('#afterScroll').remove();
                    elem.css('top', 0 - heigthElm);
                    if (st > lastScroll){
                        elem.addClass('down').css({'top': heigthElm});
                        elem.after("<div id='afterScroll'></div>");
                        $('#afterScroll').css('height', heigthElm);
                    }
                    else if(st < 200) {
                        elem.removeClass('down');
                        elem.removeClass('up');
                    }
                    else {
                        elem.addClass('up').css('top',0 - heigthElm);
                        elem.removeClass('down');
                    }
                    //Updates scroll position
                    lastScroll = st;
                });
            }
            $timeout(elementScroll, 1000);
        }
    }
}