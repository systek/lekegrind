'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http, elasticStatService, $timeout) {
        var poll = function () {
            $timeout(function () {
                fetchTopLists();
                poll();
            }, 500);
        };
        poll();

        var fetchTopLists = function () {
            elasticStatService.findTopList("group.group_country").success(
                function (data) {
                    $scope.topListCountry = data;
                });

            elasticStatService.findTopList("group.group_city.raw").success(
                function (data) {
                    $scope.topListCity = data;
                });

            elasticStatService.findTopList("group.group_name.raw").success(
                function (data) {
                    $scope.topListGroupName = data;
                });

            elasticStatService.findTopList("event.event_name.raw").success(
                function (data) {
                    $scope.topListEventName = data;
                });
        }

    });

