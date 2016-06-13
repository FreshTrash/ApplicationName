(function(define) {
    "use strict";

    define([],
        function() {

            var ModalDialogController = function($scope, $modalInstance, $resource) {

                //$scope.modalGridOpts.data.length = 0;

                var modalGridColumnDef = [],
                    modalGridData = [];
                $scope.modalGridOpts = {
                    columnDefs: modalGridColumnDef,
                    data: modalGridData
                };

                modalGridColumnDef = [{ name: 'elem', displayName: 'Элемент' },
                    { name: 'lambda', displayName: 'Lambda' }
                ];
                $scope.modalGridOpts.enableRowSelection = true;
                $scope.modalGridOpts.enableRowHeaderSelection = false;
                $scope.modalGridOpts.multiSelect = false;
                $scope.modalGridOpts.modifierKeysToMultiSelect = false;
                $scope.modalGridOpts.noUnselect = true;
                $scope.modalGridOpts.enableHorizontalScrollbar = 0;

                $scope.modalGridOpts.onRegisterApi = function(gridApi) {
                    $scope.myGridApi = gridApi;
                };


                //modalGridColumnDef[0].width=150;
                $scope.modalGridOpts.modalGridColumnDef = modalGridColumnDef;
                $scope.modalGridOpts.modalGridData = modalGridData;

                var ModalData = $resource('/api/asu_element');
                ModalData.query({}, function(data) {
                    var modalData = data;

                    //Строки таблицы
                    for (var i = 0, len = modalData.length; i < len; i += 1) {
                        var obj = {
                            "elem": modalData[i].name,
                            "lambda": modalData[i].intensity,
                        };
                        modalGridData.push(obj);
                    }
                });


                $scope.ok = function() {

                    var selectedRow = $scope.myGridApi.selection.getSelectedRows();

                    if (selectedRow[0] === undefined ||
                        selectedRow[0] === null) {
                        $scope.showModalTitleAlert = true;
                    } else {
                        var outData = {
                            name: selectedRow[0].elem,
                            lambda: selectedRow[0].lambda
                        }
                        $modalInstance.close(outData);
                    }
                }
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                }


            }
            return ["$scope", "$modalInstance", "$resource", ModalDialogController];
        });


}(define));
