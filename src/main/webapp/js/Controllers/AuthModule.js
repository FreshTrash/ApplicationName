(function(define, angular) {
    "use strict";

    define(['./AuthController.js',
    	'./AuthFactory.js'],
        function(AuthController,AuthFactory) {
            var moduleName = "AuthModule";

            angular.module(moduleName, [])
                .controller("AuthController", AuthController)
                .factory("AuthFactory", AuthFactory);

            return moduleName;
        });

}(define, angular));





