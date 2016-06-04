(function(define) {
    "use strict";

    define(['./RouteManage.js',
             './Controllers/ModelModule.js',
             './Controllers/QuizModule.js'
            
        ],
        function(RouteManage,  ModelModule, QuizModule) {
            
            var app, appName = 'WebApp';

            app = angular
                .module(
                    appName, ["ngRoute","ui.bootstrap", "ui.grid", "highcharts-ng", "ngMessages", "ngResource", "ngAnimate","ngTouch", ModelModule, QuizModule]
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



            angular.bootstrap(document.getElementsByTagName("body")[0], [appName]);

            return app;
        }
    );

}(define));
