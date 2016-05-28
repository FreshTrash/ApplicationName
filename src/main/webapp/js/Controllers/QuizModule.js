(function(define, angular) {
    "use strict";

    define(['./QuizzesController.js'],
        function(QuizzesController) {
            var moduleName = "QuizModule";

            angular.module(moduleName, [])
                .controller("QuizzesController", QuizzesController);

            return moduleName;
        });

}(define, angular));
