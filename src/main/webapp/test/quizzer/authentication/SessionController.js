
(function( define ) {
    "use strict";

    /**
     * Register the SessionController class with RequireJS
     */
    define( [ 'utils/supplant' ], function ( supplant )
    {
        var VIEW_LOGIN = "/quiz",

            /**
             * SessionController
             * @constructor
             */
            SessionController = function( session, $rootScope, $log, $location )
            {


                $log = $log.getInstance( "SessionController" );

                $rootScope.$watch( function getSession()
                {
                    return session.sessionID;

                });


            };

        // Register as global constructor function

        return [ "session", "$rootScope", "$log", "$location", SessionController ];

    });


}( define ));
