(function(head) {
    "use strict";

    head.js(
                 // {angular: "./dependencies/angular15.min.js"},
            { require: "./dependencies/vendor/requirejs/require.js", size: "80196" }, 
            { underscore: "./dependencies/vendor/underscore/underscore.js", size: "43568" }, 
            { ngRoute: "./dependencies/vendor/angular-route/angular-route.js", size: "30052" }, 
            { ngSanitize: "./dependencies/vendor/angular-sanitize/angular-sanitize.js", size: "19990" },
            { ngAnimate: "./dependencies/angular-animate.min.js"},
            { 'ui.bootstrap':"dependencies/ui-bootstrap-tpls.js"},
            { 'ui.bootstrap.tpls':"dependencies/ui-bootstrap-tpls.js"}
        )
        .ready("ALL", function() {

            require.config({
                appDir: '',
                //baseUrl: './test',
                // baseUrl: '',


                paths: {
                    // Configure alias to full paths
                "angular": "./dependencies/angular15.min",
                 "ui.bootstrap.tpls": "dependencies/ui-bootstrap-tpls",
                 "ui.bootstrap.modal": "dependencies/ui-bootstrap-tpls",


                },
                shim: {
                    'underscore': {
                        exports: '_'
                    },
                    'ngAnimate': {
                        deps: ['angular']
                    },
                    'ui.bootstrap': {
                        deps: ['angular']
                    }
                    
                }
            });


            require(['js/main.js'], function(app) {
                // Application has bootstrapped and started...
            });


        });



}(window.head));
