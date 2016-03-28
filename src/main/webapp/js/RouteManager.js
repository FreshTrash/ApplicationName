(function(define) {
    "use strict";


    define([
            'utils/logger/ExternalLogger',
            'quiz/controllers/TestController',
            'quiz/controllers/ScoreController'

        ],
        function($log, TestController, ScoreController, PageCtrl, BlogCtrl) {
            /**
             * Route management constructor ()
             * - to be used in angular.config()
             *
             * @see bootstrap.js
             */
            var RouteManager = function($routeProvider) {
                $log.debug("Configuring $routeProvider...");

                $routeProvider
                    .when("/", { templateUrl: "partials/home.html", controller: "PageCtrl" })
                    // Pages
                    .when("/about", { templateUrl: "partials/about.html", controller: "PageCtrl" })
                    .when("/faq", { templateUrl: "partials/faq.html", controller: "PageCtrl" })
                    .when("/pricing", { templateUrl: "partials/pricing.html", controller: "PageCtrl" })
                    .when("/services", { templateUrl: "partials/services.html", controller: "PageCtrl" })
                    .when("/contact", { templateUrl: "partials/contact.html", controller: "PageCtrl" })
                    .when("/book", { templateUrl: "partials/book/book_template.html", controller: "PageCtrl" })
                    // Blog
                    .when("/blog", { templateUrl: "partials/blog.html", controller: "BlogCtrl" })
                    .when("/blog/post", { templateUrl: "partials/blog_item.html", controller: "BlogCtrl" })
                    // else 404

                .when('/quiz/:question?', {
                        templateUrl: "./assets/views/quiz.tpl.html",
                        controller: "TestController"
                    })
                    .when('/scoring', {
                        templateUrl: "./assets/views/score.tpl.html",
                        controller: "ScoreController"
                    })
                    .otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
            };

            $log = $log.getInstance("RouteManager");

            return ["$routeProvider", RouteManager];
        });


}(define));
