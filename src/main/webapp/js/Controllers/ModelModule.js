(function(define, angular) {
    "use strict";

    define([
            './ModelCtrl.js',
            './ModalDialogDataShareService.js',
            './ModalDialogController.js'
        ],
        function(ModelCtrl, ModalDialogDataShareService, ModalDialogController) {
            var moduleName = "ModelModule";

            angular.module(moduleName,[])
                .service("ModalDialogDataShareService", ModalDialogDataShareService)
                .controller("ModelCtrl", ModelCtrl)
                .controller("ModalDialogController", ModalDialogController);

            return moduleName;
        });

}(define, angular));
