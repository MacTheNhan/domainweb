"use strict";

directiveApp.directive('ldpTabsControl', ldpTabsControl);

ldpTabsControl.$inject = ['$window', '$timeout'];

function ldpTabsControl($window, $timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            element.addClass('tabs-control');
            var elmOffSetTop = 0,
                getHeightMenu,
                getHelm = 0;
            var elmAtag = angular.element(element[0].querySelector('a')),
                elmAllATag = angular.element(element[0].querySelectorAll('a')),
                getLiElm = angular.element(element[0]).find('li');
            var getElmOfsetHide = angular.element(document).find('footer');

            $timeout(function () {
                elmOffSetTop += element.offset().top;
                getHelm += element[0].offsetHeight;
            }, 100);

            elmAllATag.bind('click', function (e) {
                e.preventDefault();
                angular.element($window).off('scroll');

                elmAllATag.each(function () {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                scrollToActive($(this)[0]);

                var target = this.hash,
                    $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top-45
                }, 800, 'swing', function () {
                    // $window.location.hash = target;
                    angular.element($window).on("scroll", windowScroll);
                });

            });

            $timeout(function () {
                angular.element($window).on('scroll', windowScroll);
            }, 300);

            function windowScroll() {
                var windowScrollTop = $($window).scrollTop();
                if(windowScrollTop > elmOffSetTop) {
                    element.addClass('tabs-fixed').css('top', 0);
                    if($('#add-height-elm').length == 0) {
                        element.after('<div id="add-height-elm" style="height: ' + getHelm + "px" + '"></div>');
                    }
                }
                else {
                    element.removeClass('tabs-fixed');
                    $('#add-height-elm').remove();
                }
                elmAllATag.each(function () {
                    var currLink = $(this);
                    var refElm = $(currLink.attr('href'));
                    if(refElm.position() !== undefined) {
                        if (refElm.position().top <= windowScrollTop && refElm.position().top + refElm.height() > windowScrollTop) {
                            $('#'+ attr.id + " ul li > a").removeClass("active");
                            currLink.addClass("active");
                            scrollToActive(currLink[0]);
                        }
                        else{
                            currLink.removeClass("active");
                        }
                    }
                });
                if(windowScrollTop > getElmOfsetHide[0].offsetTop) {
                    element.css('top', 0-getHelm + 'px')
                }
            }

            function scrollToActive(elm){
                var left = $(elm).position().left;
                var currScroll= $(getLiElm).parent().scrollLeft();
                var contWidth = $(getLiElm).parent().width()/2;
                var activeOuterWidth = $(elm).width()/2;

                left = left + currScroll - contWidth + activeOuterWidth;
                $(getLiElm).parent().scrollLeft(left);
            }

        }
    }
}