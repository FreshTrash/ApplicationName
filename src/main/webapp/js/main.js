(function(define) {
    "use strict";

    define(['./RouteManager.js',
             './Controllers/ModelModule.js',
            
        ],
        function(RouteManager,  ModelModule) {
            
            var app, appName = 'WebApp';

            app = angular
                .module(
                    appName, ["ngRoute", "ngSanitize", "ui.grid", "highcharts-ng","ngMessages", ModelModule]
                )
                .config(RouteManager);


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
