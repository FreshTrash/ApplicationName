(function(define) {
    "use strict";

    define([],
        function() {

            var BookController = function($scope, $anchorScroll) {


                var templates = function(part_index) {
                    return { url: './partials/book/book_files/b_' + part_index + '.html' };
                }
                $scope.template = templates(0);

                var openedPart = 0;

                $scope.openOgl = function() {
                    $scope.template = templates(0);
                    openedPart = 0;
                    buttonsController();
                }

                $scope.previous_part = function() {
                    openedPart -= 1;
                    $scope.template = templates(openedPart);
                    buttonsController();
                }

                $scope.next_part = function() {
                    openedPart += 1;
                    $scope.template = templates(openedPart);
                    buttonsController();
                }

                $scope.openPart = function(part_index) {

                    $scope.template = templates(part_index);
                    //$scope.template = { url: './partials/book/book_files/b_'+part_index+'.html' };
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
                    } else if (openedPart === 73) {
                        $scope.showNextPartBtn = false;
                    }
                    $anchorScroll();
                };
                buttonsController();


            };
            return ["$scope", "$anchorScroll", BookController];
        });
}(define));
