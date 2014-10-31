'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', function ($scope) {
        var ws = new WebSocket("ws://localhost:8080/socket/");

        $scope.elasticData = [];
        $scope.elasticCounter = 0;

        ws.onopen = function () {
            console.log("Socket has been opened!");
        };

        ws.onmessage = function (message) {
            console.log("Received data: " + message.data);
            listener(message.data);
        };

        function listener(data) {
            $scope.elasticData.unshift(JSON.parse(data));
            $scope.elasticCounter++;

            if ($scope.elasticData.length > 1000) {
                $scope.elasticData.pop();
            }
        }
    });