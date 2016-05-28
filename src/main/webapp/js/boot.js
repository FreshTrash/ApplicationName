(function(head) {
    "use strict";

    head.js(

            { require: "./dependencies/vendor/requirejs/require.js", size: "80196" }, { underscore: "./dependencies/vendor/underscore/underscore.js", size: "43568" },
            { ngRoute: "./dependencies/vendor/angular-route/angular-route.js", size: "30052" }, { ngSanitize: "./dependencies/vendor/angular-sanitize/angular-sanitize.js", size: "19990" }
        )
        .ready("ALL", function() {

            require.config({
                appDir: '',
                //baseUrl: './test',
                // baseUrl: '',


                paths: {
                    // Configure alias to full paths

                },
                shim: {
                    'underscore': {
                        exports: '_'
                    }
                }
            });


            require(['js/main.js'], function(app) {
                // Application has bootstrapped and started...
            });


        });



}(window.head));
