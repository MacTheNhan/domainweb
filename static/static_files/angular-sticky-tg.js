(function () {
	"use strict";

	angular.module('affixTg', [])
	.directive('affixWhois', function ($window){  
	    return {
	    		restric: 'A',
	        	link: function (scope, element, attrs) {
	        		var $win = angular.element($window),
	        			$window = $(window);
	        		var $searchWhois = element[0],
	        			searchWhoisWidth  = $($searchWhois).innerWidth(),
			        	searchOffsetTop = $($searchWhois).offset().top;
			        var headerHeight = new checkHeight("#header"),
			    		mainmenuHeight = new checkHeight("#mainMenu"),
			    		searchAgainHeight = new checkHeight("#searchAgain"),
			    		searchFrmGlobal = new checkHeight(".search-form-dmn-global"),
			    		searchFrmWidth = new checkWidth($searchWhois);

				    $window.scroll(function() {
				    	whoisdomain(searchAgainHeight);
				    	whoisdomain(searchFrmGlobal);
				    });
				    //Ham fixed search whois khi scroll qua no
				    function whoisdomain(searchbox) {
				    	var searchHeight = $($searchWhois).outerHeight(),
				    		totalHeight = headerHeight.heightElm() + mainmenuHeight.heightElm() + searchbox.heightElm(),
				    		addSearchWidth = searchFrmWidth.widthElm();
				    		$("#addScroll").remove();
				    	//console.log($searchWhois);
				    	if($window.scrollTop() > totalHeight){
				    		$($searchWhois).stop().css("width", addSearchWidth)
				    		.addClass('affix-search')
				    		.animate({
				    			top: 0
				    		}, 150);
				    		$(".whois-results").before($("<div id='addScroll'>").css("height", searchAgainHeight.heightElm()));
				    	} else {
				    		$($searchWhois).stop().css("width", "")
				    		.removeClass('affix-search')
				    		.animate({
				    			top: -searchHeight
				    		}, 150);
				    		$("#addScroll").remove();
				    	}
				    }
	        	}
		    };
	})
	.directive('affixSidebar', function ($window){  
	    return {
	    		restric: 'AE',
	        	link: function (scope, element, attrs) {
	        		var $sidebar = element[0],
	        			sidebarHeight = new checkHeight($sidebar),
	        			sidebarWidth  = new checkWidth("aside.sidebar"),
			        	sidebarOffsetTop = $($sidebar).offset().top,
			        	headerHeight = new checkHeight("#header"),
			        	headerResult = new checkHeight(".headerResultWrap"),
			    		mainmenuHeight = new checkHeight("#mainMenu"),
			    		headerBoxHeight = new checkHeight(".header-box"),
			    		searchWhois = new checkHeight("#searchAgain"),
			    		cartGroupSb = new checkHeight(".categories-extent-dmn"),
			    		contentHeight = new checkHeight(".suggestion-wrap"),
			    		wSb = sidebarWidth.widthElm();

				    $(window).scroll(function() {   
						sidebarFixed(wSb);
					});
				    				    
				    //Ham fixed search whois khi scroll qua no
				    function sidebarFixed(widthSb) {
				    	var $sidebarHeight = sidebarHeight.heightElm(),
				    		searchHeight = searchWhois.heightElm(),
				    		$footerHeight = new checkHeight("#footer").heightElm(),
				    		bodyHeight = contentHeight.heightElm(),
				    		totalscrTop = $(window).scrollTop() + $(window).height() - $footerHeight,
				    		totalHeightSs = searchHeight + $sidebarHeight + 30,
				    		totalHeight = headerHeight.heightElm() + mainmenuHeight.heightElm() + headerBoxHeight.heightElm() + headerResult.heightElm();
				    	console.log($(document).height() - totalHeightSs);
				    	if ($(window).scrollTop() < totalHeight) {
				    		$($sidebar).stop().css('width', widthSb)
				    		.removeClass('affix-bottom affix-sidebar')
				    		.animate({top: ''}, 80);
				    	}

				    	if ($(window).scrollTop() > totalHeight) {
				    		$($sidebar).stop().css('width', widthSb)
				    		.removeClass('affix-bottom')
				    		.addClass('affix-sidebar').animate({top: searchHeight}, 80);
				    	}
				    	
				    	if ($(window).scrollTop() > $(document).height() - totalHeightSs) {
				    		$($sidebar).stop()
				    		.css('width', widthSb)
				    		.removeClass('affix-sidebar')
				    		.addClass('affix-bottom').animate({top: bodyHeight - $sidebarHeight}, 80);
				    	}
				    }

				    function sidebarFixedInWhois() {
				    	var sidebarHeight = $($sidebar).outerHeight(),
				    		widthAside = sidebarWidth.widthElm(),
				    		searchHeight = searchWhois.heightElm(),
				    		totalHeight = headerHeight.heightElm() + mainmenuHeight.heightElm() + headerBoxHeight.heightElm();
				    	//console.log($searchWhois);
				    	if($window.scrollTop() > totalHeight){
				    		$($sidebar).stop().css({
				    			'width': widthAside
				    		})
				    		.addClass('affix-sidebar')
				    		.animate({
				    			top: searchHeight
				    		}, 80);
				    	} else {
				    		$($sidebar).stop().css({
				    			'width': ''
				    		})
				    		.removeClass('affix-sidebar')
				    		.animate({top: -sidebarHeight}, 80);
				    	}
				    }
	        	}
		    };
	})
	.directive('inetAffix', function ($window){
		var $win = angular.element($window);
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				var topClass = attrs['inetAffix'],
					topPadding = parseInt(attrs['paddingWhenAtTop'], 10),
					parent = element.parent(),
					offsetTop;

				$win.on("scroll", function () {
					// dynamic page layout so have to recalculate every time;
					// take offset of parent because after the element gets fixed
					// it now has a different offset from the top
					offsetTop = parent.offset().top - topPadding;
					if ($win.scrollTop() >= offsetTop) {
						element.addClass(topClass);
					} else {
						element.removeClass(topClass);
					}
				});
			}
		};
	})
	.directive('mbAffixFilter', function ($window){  
	    return {
    		restric: 'E',
        	link: function (scope, element, attrs) {
        		var $win = angular.element($window),
        			$window = $(window);
        		var $filterDmn = element[0],
		        	filterOffsetTop = $($filterDmn).offset().top;
		        var heightNavTop = new checkHeight(".header-wrap"),
		        	popularDomain = new checkHeight("#domain-involve"),
		        	headerResult = new checkHeight(".header-result-wrap"),
		        	filterDmnHeight = new checkHeight("#filterGroup"),
		        	searchAgainHeight = new checkHeight("#searchAgain");

			    $window.scroll(function() {
			    	filterdomain(filterDmnHeight);
			    });
			    //Ham fixed search whois khi scroll qua no
			    function filterdomain(filterbox) {
			    	var filterDmnHeight = $($filterDmn).outerHeight(),
			    		topHeight = searchAgainHeight.heightElm(),
			    		totalHeight = heightNavTop.heightElm() + headerResult.heightElm() + popularDomain.heightElm();
			    	//console.log($searchWhois);
			    	if($window.scrollTop() > totalHeight){
			    		$($filterDmn).stop().addClass('inet-affix').animate({top: topHeight}, 150);
			    	} else {
			    		$($filterDmn).stop().removeClass('inet-affix').animate({top: -filterDmnHeight}, 150);
			    	}
			    }
        	}
	    };
	})
	.directive('mbFilterDmnCt', function ($window){
		return {
			restrict: 'E',
			link: function (scope, element, attrs) {
        		var $win = angular.element($window),
        			$window = $(window);
        		var $filterDmn = element[0],
		        	filterOffsetTop = $($filterDmn).offset().top;
		        var heightNavTop = new checkHeight(".header-wrap"),
		        	headerResult = new checkHeight(".header-result-wrap"),
		        	filterDmnHeight = new checkHeight("#filterGroup"),
		        	searchAgainHeight = new checkHeight("#searchAgain");

			    $window.scroll(function() {
			    	filterdomain(filterDmnHeight);
			    });
			    //Ham fixed search whois khi scroll qua no
			    function filterdomain(filterbox) {
			    	var filterDmnHeight = $($filterDmn).outerHeight(),
			    		topHeight = searchAgainHeight.heightElm(),
			    		windowHeight = $window.height(),
			    		totalHeight = heightNavTop.heightElm() + headerResult.heightElm(); // Get Auto Height
			    	//console.log($searchWhois);
			    	if($window.scrollTop() > totalHeight){
			    		$($filterDmn).stop().css("height", windowHeight - topHeight);
			    	} else {
			    		$($filterDmn).stop().css("height", "auto");
			    	}
			    }
        	}
		}
	})
	.directive('mbTotalPay', function ($window){
		return {
			restrict: 'E',
			link: function (scope, element) {
        		var $win = angular.element($window),
        			$window = $(window);
        		var $totalPay = element[0],
		        	filterOffsetTop = $($totalPay).offset().top;
		        var heightNavTop = new checkHeight(".header-wrap"),
		        	cartStepHeight = new checkHeight(".cart-step-billing"),
		        	totalPayHeight = new checkHeight($totalPay);

			    $window.scroll(function() {
			    	totalPayFc(totalPayHeight);
			    });
			    //Ham fixed search whois khi scroll qua no
			    function totalPayFc(totalPay) {
			    	var totalPayHeight = $($totalPay).outerHeight(),
			    		totalHeight = cartStepHeight.heightElm(),
			    		totalHeight = heightNavTop.heightElm() + cartStepHeight.heightElm(); // Get Auto Height
			    	//console.log($searchWhois);
			    	if($window.scrollTop() > totalHeight){
			    		$($totalPay).stop().addClass('inet-affix').animate({top: 0}, 150);
			    	} else {
			    		$($totalPay).stop().removeClass('inet-affix').animate({top: -totalHeight}, 150);
			    	}
			    }
        	}
		}
	});

	function checkHeight($heightElm){
		this.$heightElm = $heightElm;
		this.heightElm = function(){
			return $($heightElm).outerHeight();
		}
	}

	function checkWidth($widthElm){
		this.$widthElm = $widthElm;
		this.widthElm = function() {
			return $($widthElm).innerWidth();
		}
	}

})();