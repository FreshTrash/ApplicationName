(function(define, angular) {
    "use strict";

    define(['./ModelCtrl.js'],
        function(ModelCtrl) {
            var moduleName = "ModelModule";

            angular.module(moduleName, [])
                .controller("ModelCtrl", ModelCtrl);

            return moduleName;
        });

}(define, angular));
