(function(define) {
    "use strict";


    define([
            './Controllers/ModelCtrl.js',
            './Controllers/QuizzesController.js',
            './Controllers/AuthController.js'

        ],
        function($log, PageCtrl, BlogCtrl, ModelCtrl,AuthController) {
            /**
             * Route management constructor ()
             * - to be used in angular.config()
             *
             * @see bootstrap.js
             */
            var RouteManage = function($routeProvider) {
               
                $routeProvider
                    .when("/", { templateUrl: "partials/home.html", controller: "PageCtrl" })
                    
                    .when("/about", { templateUrl: "partials/about.html", controller: "PageCtrl" })
                    // .when("/services", { templateUrl: "partials/services.html", controller: "PageCtrl" })
                    .when("/contact", { templateUrl: "partials/contact.html", controller: "PageCtrl" })
                    .when("/book", { templateUrl: "partials/book/book_template.html", controller: "PageCtrl" })
                    .when('/taskbook', { templateUrl: "partials/taskbook.html", controller: "TaskbookController" })

                    .when("/models", { templateUrl: "partials/models/model1.html", controller: "ModelCtrl" })
                    .when('/quizzes', { templateUrl: "partials/quizzes.html", controller: "QuizzesController" })


                    .when('/admin', { templateUrl: "partials/admin_view.html", controller: "AuthController" })
                   
                   //Бага: ангуляр открывает /#/login, а такой страницы нет
                    .when('/login', { templateUrl: "partials/login/login.jsp", controller: "AuthController" })
                   //TODO: ADD REGITRATION.when('/reg', { templateUrl: "", controller: "AuthController" })


                    //.when("/faq", { templateUrl: "partials/faq.html", controller: "PageCtrl" })
                    //.when("/pricing", { templateUrl: "partials/pricing.html", controller: "PageCtrl" })
                    
                    //.when("/blog", { templateUrl: "partials/blog.html", controller: "BlogCtrl" })
                    //.when("/blog/post", { templateUrl: "partials/blog_item.html", controller: "BlogCtrl" })
                    

                    .otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
            };

            

            return ["$routeProvider", RouteManage];
        });


}(define));
