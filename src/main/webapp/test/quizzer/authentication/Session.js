(function (define ) {
    "use strict";

    /**
     * Register the Session class with RequireJS
     */
    define( [], function ( ) {

        var validate = function ( target, defaultVal )
            {
                return target || defaultVal;
            },
            onClear  = function( all )
            {
                _session.sessionID              = null;

                // TODO - refactor since these are specific to the `quiz` module
                _session.quiz                   = undefined;
                _session.score                  = undefined;
                _session.selectedQuiz           = 1;

                return _session;
            },
            _session = {
                sessionID         : null,
                selectedQuiz      : 1
            };


        /**
         * Publishes a constructor function which returns the `session` singleton instances
         *
         * @returns Hashmap
         * @constructor
         */
        return function () {
            return _session;
        };

    });


}( define  ));
