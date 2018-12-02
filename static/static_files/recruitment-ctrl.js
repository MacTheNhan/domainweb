"use strict";

iNETPageApp.controller('recruitmentCtrl', recruitmentCtrl);
iNETPageApp.controller('recruitmentDetailCtrl', recruitmentDetailCtrl);

recruitmentCtrl.$inject = ['$scope', '$http', 'serviceApiGlobal', 'inetRecruitment'];
recruitmentDetailCtrl.$inject = ['$scope', '$http', '$sce', 'serviceApiGlobal', 'icrmNotification'];

function recruitmentCtrl($scope, $http, serviceApiGlobal, inetRecruitment) {
    // Tigerbui dữ liệu Demo
    $scope.timeToday = new Date();

    inetRecruitment.listcategory().promise.then(function (res) {
        $scope.categories = res.data;
    });

    inetRecruitment.listall().promise.then(function (res) {
        $scope.recruitments = res.data;
    });

    $scope.search = function(category){
        inetRecruitment.listall(category).promise.then(function (res) {
            $scope.recruitments = res.data;
            $scope.showHideJob = false;
            serviceApiGlobal.offSetTop('#listAllJob');
        });
    };
}

function recruitmentDetailCtrl($scope, $http, $sce, serviceApiGlobal, icrmNotification) {
    $scope.trustHTML = function(str){
        return $sce.trustAsHtml(str);
    };

    $scope.loading = true;
    $http.post('/api/recruitment/getbypath', JSON.stringify({path: window.location.pathname.split('/')[2]}), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).success(function (data) {
        $scope.loading = false;
        $scope.recruitment = data;
    });

    $scope.scrollTo = function (id) {
        serviceApiGlobal.offSetTop(id);
    };
    $scope.candidate = {};
    $scope.apply = function(){
        $scope.candidate.recruitmentId = $scope.recruitment._id;
        $scope.loading = true;
        $http.post('/api/recruitmentcandidate/create', JSON.stringify($scope.candidate), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
            $scope.loading = false;
            $scope.response = data;
            data.status == 'error' ? icrmNotification.error(data.message) : '';
            if($scope.response.status == 'success'){
                icrmNotification.success('Bạn đã ứng tuyển thành công. Chúng tôi sẽ liên hệ lại với bạn sớm nhất.');
                $scope.recruitment.template = 'recruitmentcandidateapply';
                $scope.recruitment.fullname = $scope.candidate.fullname;
                $http.post('/api/notification/push', JSON.stringify($scope.recruitment),
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).success(function (dataPush) {
                });
            }
        })
    }

    $scope.searchRalated = function(){
        var params = {

        }
        $http.post('/api/recruitment/search', JSON.stringify(params), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
            $scope.recruitments = data;
        })
    }
    $scope.searchRalated();
}
