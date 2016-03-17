/**
 * Created by Stephen on 2016-03-08/0008.
 */
//指令模块
directivesModule.directive('hello', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>Hello World 123!</div>'
    };
}).directive("pcTest", function () {
    return {
        scope: {
            ngModel: '='
        },
        template: '<div>hi: <input type="text" ng-model="ngModel"></div>',
        replace: true

    }
}).directive("pcMax", function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, atts, ctrl) {
            //console.info(angular.toJson(ctrl));
            var value = '123';
            ctrl.$parsers.push(value);
            //console.info(angular.toJson(ctrl.$parsers));
        }
    }
});
