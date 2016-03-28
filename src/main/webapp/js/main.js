(function(define) {
    "use strict";

    define([
            'utils/logger/ExternalLogger',
            'utils/logger/LogDecorator',
            'auth/AuthenticateModule',
            './RouteManager.js',
            'quiz/QuizModule'
        ],
        function($log, LogDecorator, AuthenticateModule, RouteManager, QuizModule) {
            /**
             * Specify main application dependencies...
             * one of which is the Authentication module.
             *
             * @type {Array}
             */
            var app, appName = 'WebApp';


            $log = $log.getInstance("BOOTSTRAP");
            $log.debug("Initializing {0}", [appName]);

            /**
             * Start the main application
             *
             * We manually start this bootstrap process; since ng:app is gone
             * ( necessary to allow Loader splash pre-AngularJS activity to finish properly )
             */
            /**
             * Controls the Blog
             */

            app = angular
                .module(
                    appName, ["ngRoute", "ngSanitize", AuthenticateModule, QuizModule]
                )
                .config(LogDecorator)
                .config(RouteManager);



            app.controller('BlogCtrl', function( /* $scope, $location, $http */ ) {
                console.log("Blog Controller reporting for duty.");
            });

            /**
             * Controls all other Pages
             */
            app.controller('PageCtrl', function( /* $scope, $location, $http */ ) {
                console.log("Page Controller reporting for duty.");
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
