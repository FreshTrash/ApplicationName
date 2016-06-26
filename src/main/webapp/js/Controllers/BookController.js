(function(define) {
    "use strict";

    define([],
        function() {

            var BookController = function($scope,$anchorScroll) {


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
                    { url: './partials/book/book_files/b_15.html' },
                    { url: './partials/book/book_files/b_16.html' },
                    { url: './partials/book/book_files/b_17.html' },
                    { url: './partials/book/book_files/b_18.html' },
                    { url: './partials/book/book_files/b_19.html' },
                    { url: './partials/book/book_files/b_21.html' },
                    { url: './partials/book/book_files/b_22.html' },
                    { url: './partials/book/book_files/b_23.html' },
                    { url: './partials/book/book_files/b_24.html' },
                    { url: './partials/book/book_files/b_25.html' },
                    { url: './partials/book/book_files/b_26.html' },
                    { url: './partials/book/book_files/b_27.html' },
                    { url: './partials/book/book_files/b_28.html' },
                    { url: './partials/book/book_files/b_29.html' },
                    { url: './partials/book/book_files/b_30.html' },
                    { url: './partials/book/book_files/b_31.html' },
                    { url: './partials/book/book_files/b_32.html' },
                    { url: './partials/book/book_files/b_33.html' },
                    { url: './partials/book/book_files/b_34.html' },
                    { url: './partials/book/book_files/b_35.html' },
                    { url: './partials/book/book_files/b_36.html' },
                    { url: './partials/book/book_files/b_37.html' },
                    { url: './partials/book/book_files/b_38.html' },
                    { url: './partials/book/book_files/b_39.html' },
                    { url: './partials/book/book_files/b_40.html' },
                    { url: './partials/book/book_files/b_41.html' },
                    { url: './partials/book/book_files/b_42.html' },
                    { url: './partials/book/book_files/b_43.html' },
                    { url: './partials/book/book_files/b_44.html' },
                    { url: './partials/book/book_files/b_45.html' },
                    { url: './partials/book/book_files/b_46.html' },
                    { url: './partials/book/book_files/b_47.html' },
                    { url: './partials/book/book_files/b_48.html' },
                    { url: './partials/book/book_files/b_49.html' },
                    { url: './partials/book/book_files/b_50.html' },
                    { url: './partials/book/book_files/b_51.html' },
                    { url: './partials/book/book_files/b_52.html' },
                    { url: './partials/book/book_files/b_53.html' },
                    { url: './partials/book/book_files/b_54.html' },
                    { url: './partials/book/book_files/b_55.html' },
                    { url: './partials/book/book_files/b_56.html' },
                    { url: './partials/book/book_files/b_57.html' },
                    { url: './partials/book/book_files/b_58.html' },
                    { url: './partials/book/book_files/b_59.html' },
                    { url: './partials/book/book_files/b_60.html' },
                  
                ];
                $scope.template = templates[0];

                var openedPart = 0;
                var tmpl_len = templates.length;

                

                $scope.openOgl = function() {
                    $scope.template = templates[0];
                    openedPart = 0;
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
                    $anchorScroll();
                };
				buttonsController();


            };
            return ["$scope","$anchorScroll", BookController];
        });


}(define));
