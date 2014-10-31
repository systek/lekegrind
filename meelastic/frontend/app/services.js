'use strict';

angular.module('myApp.services', [])

    .service('elasticStatService', function ($http) {
        this.findCount = function () {
            return $http.get('http://localhost:3000/api/count');
        }

        this.findTopList = function (query) {
            return $http.get("http://localhost:3000/api/toplist/" + query);
        }

        this.search = function (query) {
            return $http.get("http://localhost:3000/api/query/" + query);
        }
    });