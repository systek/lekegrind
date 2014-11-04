'use strict';

angular.module('myApp.view4', ['ngRoute', 'nvd3'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $http, elasticStatService, $timeout) {

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 300,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 50
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 0,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 20,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 35

                }
            }
        };

        $scope.data = [
            {
                "key": "Quantity",
                "bar": true,
                values: [
                    [new Date().getTime(), 0]
                ]
            }
        ];

        var poll = function () {
            $timeout(function () {
                fetchData();
                poll();
            }, 2000);
        };
        poll();

        var fetchData = function () {
            elasticStatService.findCount().success(
                function (data) {
                    $scope.data[0].values.push([new Date().getTime(), data]);
                    if ($scope.data[0].values.length > 20) {
                        $scope.data[0].values.shift();
                    }
                });

        }

    });

