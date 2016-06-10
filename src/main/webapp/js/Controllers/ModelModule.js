(function(define, angular) {
    "use strict";

    define([
            './ModelCtrl.js',
            './ModalDialogController.js'
        ],
        function(ModelCtrl, ModalDialogController) {
            var moduleName = "ModelModule";

            angular.module(moduleName,[])
                .controller("ModelCtrl", ModelCtrl)
                .controller("ModalDialogController", ModalDialogController);

            return moduleName;
        });

}(define, angular));
