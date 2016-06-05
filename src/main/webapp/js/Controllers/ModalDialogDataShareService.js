(function(define) {
    "use strict";

    define([],
        function() {

            var ModalDialogDataShareService = function() {

                var service = {};
                service.name = "";
                service.lambda = 0;

                service.getName = function() {
                    return this.name;
                };

                service.getLambda = function() {
                    return this.lambda;
                };

                service.setData = function(name, lambda) {
                    this.name = name;
                    this.lambda = lambda;
                };

                return service;

            }
            return [ ModalDialogDataShareService];
        });


}(define));
