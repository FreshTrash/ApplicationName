(function(define) {
    "use strict";

    define([],
        function() {

            var BookController = function($scope) {


                var templates = [{ url: './partials/book/book_files/b_0.html' },
                    { url: './partials/book/book_files/b_1.html' },
                    { url: './partials/book/book_files/b_2.html' },
                    { url: './partials/book/book_files/b_3.html' },
                    { url: './partials/book/book_files/b_4.html' },
                    { url: './partials/book/book_files/b_5.html' },
                    { url: './partials/book/book_files/b_6.html' },
                    { url: './partials/book/book_files/b_7.html' },
                    { url: './partials/book/book_files/b_8.html' },
                    { url: './partials/book/book_files/b_9.html' },
                    { url: './partials/book/book_files/b_10.html' },
                    { url: './partials/book/book_files/b_11.html' },
                    { url: './partials/book/book_files/b_12.html' },
                    { url: './partials/book/book_files/b_13.html' },
                    { url: './partials/book/book_files/b_14.html' },
                  
                ];
                $scope.template = templates[0];

                var openedPart = 0;
                var tmpl_len = templates.length;

                

                $scope.openOgl = function() {
                    $scope.template = templates[0];
                     buttonsController();
                }

                $scope.previous_part = function() {

                    openedPart -= 1;
                    $scope.template = templates[openedPart];
                    buttonsController();
                }

                $scope.next_part = function() {
                    openedPart += 1;
                    $scope.template = templates[openedPart];
                     buttonsController();
                }

                $scope.openPart = function(part_index) {
                	console.log(part_index);
                    $scope.template = templates[part_index]

                    openedPart = part_index;
                    buttonsController();

                }

                var buttonsController = function() {
                    $scope.showPreviousPartBtn = true;
                    $scope.showNextPartBtn = true;
                    $scope.showOgl = true;

                    if (openedPart === 0) {
                        $scope.showPreviousPartBtn = false;
                        $scope.showOgl = false;
                    } else if (openedPart === (tmpl_len - 1)) {
                        $scope.showNextPartBtn = false;
                    }
                };
				buttonsController();


            };
            return ["$scope", BookController];
        });


}(define));
