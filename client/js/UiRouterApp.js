'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('uiRouterApp', ['ui.router']);
// For Component users, it should look like this:
// var myApp = angular.module('myApp', [require('angular-ui-router')]);
app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    // Now set up the states
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "html/partials/state1.html"
        })
        .state('state1.list', {
            url: "/list",
            templateUrl: "html/partials/state1.list.html",
            controller: function ($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('state2', {
            url: "/state2",
            templateUrl: "html/partials/state2.html"
        })
        .state('state2.list', {
            url: "/list",
            templateUrl: "html/partials/state2.list.html",
            controller: function ($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        })
});

//angular.module('myApp', ['ngRoute'])
//    .config(['$routeProvider', function ($routeProvider) {
//        console.log("abc");
//        var routes = ['view1', 'view2'];
//        var setRoutes = function (route) {
//            var url = '/' + route;
//            var config = {
//                templateUrl: 'html/' + route + '.html'
//            };
//            $routeProvider.when(url, config);
//            return $routeProvider;
//        };
//        routes.forEach(function (route) {
//            return setRoutes(route);
//        });
//        $routeProvider.when('/', {redirectTo: '/index'})
//            .otherwise({redirectTo: '/index'});
//    }]);
