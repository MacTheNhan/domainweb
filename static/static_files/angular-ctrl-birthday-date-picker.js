(function () {
    'use strict';
    //Module controller su dung de cai dat datepicker Birthday
    angular.module('birthdayDatePickerApp', [])
    .controller('birthdayDatePickerCtrl', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };
        
        $scope.openParam = function ($event, index) {
            $scope.statusArray[index] = true;
        };

        $scope.setDate = function (day, month, year) {
            $scope.dt = new Date(day, month, year);
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1,
            showWeeks: false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd/MM/yyyy'];
        $scope.format = $scope.formats[4];

        $scope.status = {
            opened: false
        };
        
        $scope.statusArray = [];
        $scope.statusArray.push(false);
        $scope.statusArray.push(false);
        $scope.statusArray.push(false);
        $scope.statusArray.push(false);

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
          },
            {
                date: afterTomorrow,
                status: 'partially'
          }
        ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };
    });
})();