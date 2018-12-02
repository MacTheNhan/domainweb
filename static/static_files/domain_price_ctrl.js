angular.module("domainPriceApp", ['affixTg','whoisModuleService','directiveGlobalApp', 'angularMoment', 'translateApp'])
.filter('currency', function () {
    return function (input) {
    	if(input == undefined)
    		return null;
    	return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' \u20ab';
    };
})
    .controller('domainPriceCtrl', ['$scope', '$http', 'whoisService', 'moment', domainPriceController]);

function domainPriceController ($scope, $http, whoisService, moment){
    $scope.fulldomainname = undefined;
    $scope.cklengthGlobal = [];
    //Lấy ra danh sách đuôi tên miền hỗ trợ
    whoisService.getSuffixVNNIC().promise.then(function(response){
        $scope.suffixes = response.data;
        for(var i=0; i < $scope.suffixes.length; i++){
            if($scope.suffixes[i].promotionFrom != undefined && $scope.suffixes[i].promotionTo != undefined){
                var fromDate = moment($scope.suffixes[i].promotionFrom, 'MM/DD/YYYY HH:mm');
                var toDate = moment($scope.suffixes[i].promotionTo, 'MM/DD/YYYY HH:mm').add(1, 'days');
                if(moment().isBetween(fromDate, toDate)){
                    $scope.suffixes[i].isPromotion = true;
                }
            }
        }
    });

    //Ham gan duoi ten mien vao o search
    $scope.getExtesDmn = function(extesDmn){
        $scope.selected = extesDmn;
        $scope.focusThis = true;
    };
    $scope.removeExtesDmn = function(){
        $scope.selected = "";
        $scope.focusThis = false;
    };
    //Click submit form
    $scope.submitform = function(){
        if($scope.selected){
            $scope.query = $scope.query + '.' + $scope.selected;
        } else {
            return;
        }
    };

    $scope.scrollTo = function(id){
        $('html, body').animate({scrollTop: $(id).offset().top}, 'slow');
    }
}