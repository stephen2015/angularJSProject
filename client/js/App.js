/**
 * Created by Stephen on 2016-03-07/0007.
 */
var dependencies = ['ngRoute', 'ngAnimate', 'routeConfig', 'directives', 'services', 'controllers', 'filters', 'ui.bootstrap'];

angular.module('app', dependencies);

//路由模块
angular.module('routeConfig', ['ngRoute']).config(function ($routeProvider) {
    var routes = ['view1', 'view2', 'partials/state1', 'partials/state2'];
    var setRoutes = function (route) {
        var url = '/' + route;
        var config = {
            templateUrl: 'html/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
    };
    routes.forEach(function (route) {
        return setRoutes(route);
    });
    //$routeProvider.
    //when('/view1', {
    //    templateUrl: 'html/view1.html'
    //}).when('/view2', {
    //    templateUrl: 'html/view2.html'
    //}).
    //otherwise({
    //    redirectTo: '/'
    //});
});//配置我们的路由

this.directivesModule = angular.module('directives', []);
this.controllersModule = angular.module('controllers', []);
this.servicesModule = angular.module('services', []);
this.filtersModule = angular.module('filters', []);

