'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope, $http, elasticStatService, $timeout) {
        $scope.name = '';

        elasticStatService.findCount().success(
            function (data) {
                $scope.elasticCount = data;
            });

        $scope.searchResults = '';
        $scope.search = function () {
            elasticStatService.search($scope.searchText).success(
                function (data) {
                    $scope.searchResults = data;
                }
            );
        };

        var poll = function () {
            $timeout(function () {
                elasticStatService.findCount().success(
                    function (data) {
                        $scope.elasticCount = data;
                    });

                poll();
            }, 500);
        };
        poll();

    })
;