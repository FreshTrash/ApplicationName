(function(define, angular) {
    "use strict";

    define(['./BookController.js'],
        function(BookController) {
            var moduleName = "BookModule";

            angular.module(moduleName, [])
                .controller("BookController", BookController);
             
            return moduleName;
        });

}(define, angular));
