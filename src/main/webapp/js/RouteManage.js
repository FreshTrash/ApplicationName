(function(define) {
    "use strict";


    define([
            
            './Controllers/ModelCtrl.js',
           './Controllers/QuizzesController.js'

        ],
        function($log, PageCtrl, BlogCtrl, ModelCtrl) {
            /**
             * Route management constructor ()
             * - to be used in angular.config()
             *
             * @see bootstrap.js
             */
            var RouteManage = function($routeProvider) {
               
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
                    .when("/models", { templateUrl: "partials/models/model1.html", controller: "ModelCtrl" })
                    
                   .when('/quizzes', { templateUrl: "partials/quizzes.html", controller: "QuizzesController" })


                    .otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
            };

            

            return ["$routeProvider", RouteManage];
        });


}(define));
