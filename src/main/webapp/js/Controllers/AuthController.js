(function(define) {
    "use strict";

    define([],
        function() {

            var AuthController = function($scope, $resource) {

                var hideAll = function() {
                    $scope.show_book = false;
                    $scope.show_taskbook = false;
                    $scope.show_quizz = false;
                    $scope.show_model = false;
                    $scope.show_users = false;
                };

                var modelColumns = [],
                    modelData = [];
                $scope.modelGridOpts = {
                    columnDefs: modelColumns,
                    data: modelData
                };

                $scope.showBook = function() {
                    hideAll();
                    $scope.show_book = true;
                }

                $scope.showTaskbook = function() {
                    hideAll();
                    $scope.show_taskbook = true;
                }

                $scope.showTests = function() {
                    hideAll();
                    $scope.show_quizz = true;
                }

                $scope.showModel = function() {
                    hideAll();
                    $scope.show_model = true;



                    $scope.modelGridOpts.enableHorizontalScrollbar = 0;


                    modelColumns = [{ name: 'elem', displayName: 'Элемент', width:100 },
                        { name: 'lambda', displayName: 'Lambda', width:30 }
                    ];


                    // $scope.modalGridOpts.onRegisterApi = function(gridApi) {
                    //     $scope.myGridApi = gridApi;
                    // };


                    //modalGridColumnDef[0].width=150;


                    var Data = $resource('/api/asu_element');
                    Data.query({}, function(data) {
                        //Строки таблицы
                        for (var i = 0, len = data.length; i < len; i += 1) {
                            var obj = {
                                "elem": data[i].name,
                                "lambda": data[i].intensity,
                            };
                            modelData.push(obj);
                        }
                    });
   					$scope.modelGridOpts.modelColumns = modelColumns;
                    $scope.modelGridOpts.modelData = modelData;
                 

                }

                $scope.showUsers = function() {
                    hideAll();
                    $scope.show_users = true;
                }








            };
            return ["$scope", "$resource", AuthController];
        });


}(define));
