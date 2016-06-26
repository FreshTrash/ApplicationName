(function(define) {
    "use strict";

    define(['./RouteManage.js',
            './Controllers/ModelModule.js',
            './Controllers/QuizModule.js',
            './Controllers/AuthModule.js',
            './Controllers/BookModule.js'
        ],
        function(RouteManage, ModelModule, QuizModule, AuthModule, BookModule) {

            var app, appName = 'WebApp';

            app = angular
                .module(
                    appName, ["ngRoute", "ui.bootstrap.modal", "ui.bootstrap.tpls",
                        "ui.grid", "ui.grid.selection", "ui.grid.edit", "highcharts-ng",
                        "ngMessages", "ngResource", "ngAnimate", "ngTouch", ModelModule,
                        QuizModule, AuthModule, BookModule, "ui.bootstrap","angularCSS"
                    ]
                )
                .config(RouteManage);


            app.controller('BlogCtrl', function( /* $scope, $location, $http */ ) {
                //console.log("Blog Controller reporting for duty.");
            });


            app.controller('PageCtrl', function( /* $scope, $location, $http */ ) {
                //console.log("Page Controller reporting for duty.");
                /* // Activates Tooltips for Social Links
                 $('.tooltip-social').tooltip({
                   selector: "a[data-toggle=tooltip]"
                 })*/
            });


            // app.controller('HeaderCtrl', function( $scope, $location, $http ) {
            //     //console.log("Page Controller reporting for duty.");
            //      // Activates Tooltips for Social Links
            //      $('.tooltip-social').tooltip({
            //        selector: "a[data-toggle=tooltip]"
            //      })
            // });


            app.directive('header', function() {
                return {
                    restrict: 'A',
                    replace: true,
                    scope: { user: '=' },
                    templateUrl: "/partials/templates/header.html",
                    controller: ['$scope', '$filter', function($scope, $filter) {
                        //$scope.navbarCollapsed = true;// Your behaviour goes here :)
                    }]
                }
            });


            angular.bootstrap(document.getElementsByTagName("body")[0], [appName]);

            return app;
        }
    );

}(define));
