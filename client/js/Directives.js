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
}).directive('bdzEcharts', function () {
    return {
        restrict: 'EA',
        template: '<div></div>',
        replace: true,
        scope: {
            option: '=?'
        },
        link: function (scope, element, attrs) {
            scope.$watch('option', function () {
                var getChart = function () {
                    var myChart = echarts.init(element[0]);
                    myChart.setOption(scope.option);
                };
                if (!window.echarts) {
                    $.ajax({
                        async: false,
                        url: "/assets/vendor/echarts/2.0.3/build/echarts-plain.js",
                        dataType: "script",
                        success: function () {
                            getChart();
                        }
                    });
                } else {
                    getChart();
                }
            })
        }
    }
});
