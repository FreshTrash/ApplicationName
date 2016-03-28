
(function ( define, angular ) {
    "use strict";

    define([
            'auth/Session',
            'auth/SessionController',
        ],
        function ( Session, SessionController )
        {
            var moduleName = "quizzer.Authenticate";

            angular
                .module(     moduleName,    [ ]                     )
                .service(    "session",           Session           )
                .controller( "SessionController", SessionController );

            return moduleName;
        });


}( define, angular ));

