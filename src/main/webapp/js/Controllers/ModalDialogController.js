(function(define) {
    "use strict";

    define(["ui.bootstrap.modal"],
        function() {

            var ModalDialogController = function($scope, $uibModalInstance, $resource, lammm) {

                //$scope.modalGridOpts.data.length = 0;

                var modalGridColumnDef = [],
                    modalGridData = [];
                $scope.modalGridOpts = {
                    columnDefs: modalGridColumnDef,
                    data: modalGridData
                };

                $scope.modalGridOpts.enableRowSelection = true;
                $scope.modalGridOpts.enableRowHeaderSelection = false;
                $scope.modalGridOpts.multiSelect = false;
                $scope.modalGridOpts.modifierKeysToMultiSelect = false;
                $scope.modalGridOpts.noUnselect = true;
                $scope.modalGridOpts.enableHorizontalScrollbar = 0;

                $scope.modalGridOpts.onRegisterApi = function(gridApi) {
                    $scope.myGridApi = gridApi;
                };

                modalGridColumnDef = [{ name: 'elem', displayName: 'Элемент',width: 80},
                    { name: 'lambda', displayName: 'Lambda' }
                ];

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
                    $scope.modalGridOpts.modalGridColumnDef = modalGridColumnDef;
                    $scope.modalGridOpts.modalGridData = modalGridData;
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
                          
                            //$rootScope.changeElemLambda(selectedRow[0].name,selectedRow[0].lambda);
                        $uibModalInstance.close(outData);
                    }
                    //showModalTitleAlert

                }
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                }


            }
            return ["$scope", "$uibModalInstance", "$resource", ModalDialogController];
        });


}(define));
