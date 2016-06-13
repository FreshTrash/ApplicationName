(function(define) {
    "use strict";

    define([],
        function() {

            var AuthController = function($scope, $resource, $http) {

                var hideAll = function() {
                    $scope.show_book = false;
                    $scope.show_taskbook = false;
                    $scope.show_quizz = false;
                    $scope.show_model = false;
                    $scope.show_users = false;
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

                    equipmentSelectDataUpdate();

                    $scope.modelGridOpts.enableHorizontalScrollbar = 0;
                }

                var modelColumns = [],
                    modelData = [];
                $scope.modelGridOpts = {
                    columnDefs: [{ name: 'Delete', cellTemplate: '<button  ng-click="grid.appScope.deleteRow(row)">Удалить</button>', enableCellEdit: false, width: 70 },
                        { name: 'id', displayName: 'id', enableCellEdit: false, width: 50 },
                        { name: 'elem', displayName: 'Элемент', enableCellEdit: true, width: 420 },
                        { name: 'lambda', displayName: 'Lambda', enableCellEdit: true, type: 'number', width: 120 },
                        { name: 'equipid', visible: false },
                        { name: 'equipname', visible: false }
                    ],
                    data: modelData,
                    enableColumnResizing: true
                };


                $scope.equipmentSelectData = {
                    repeatSelect: false
                };


                $scope.deleteRow = function(row) {

                    $http.delete('/api/asu_element/' + row.entity.id)
                        .then(function() {
                            var index = $scope.modelGridOpts.data.indexOf(row.entity);
                            $scope.modelGridOpts.data.splice(index, 1);
                        },function(response){
                            $scope.msg.resp=response;
                        });

                };

                var equipmentSelectDataUpdate = function() {
                    var Equipment = $resource('/api/equipment');
                    Equipment.query({}, function(data) {
                        $scope.equipmentSelectData.availableOptions = data;
                    })
                }

                var AsuElementsData = $resource('/api/asu_element');
                $scope.updateModelTable = function(selectedEquipmentId) {
                    $scope.modelGridOpts.data.length = 0;

                    AsuElementsData.query({}, function(data) {
                        $scope.modelQueryData = data;
                        var selectedAsuElements = findAsuElementsById(data, selectedEquipmentId);
                        //Строки таблицы
                        for (var i = 0, len = selectedAsuElements.length; i < len; i += 1) {
                            var obj = {
                                "id": selectedAsuElements[i].id,
                                "elem": selectedAsuElements[i].name,
                                "lambda": selectedAsuElements[i].intensity,
                                "equipid": selectedAsuElements[i].equipment.id,
                                "equiname": selectedAsuElements[i].equipment.name,
                            };

                            modelData.push(obj);
                        }
                    });
                };

                var findAsuElementsById = function(allAsuElements, equimentId) {
                    var asuElementsOfChoosedEquipment = [];
                    for (var i = 0, len = allAsuElements.length; i < len; i += 1) {
                        if (allAsuElements[i].equipment.id == equimentId) {
                            asuElementsOfChoosedEquipment.push(allAsuElements[i]);
                        }
                    }
                    return asuElementsOfChoosedEquipment;
                }


                $scope.msg = {};

                $scope.modelGridOpts.onRegisterApi = function(gridApi) {
                    //set gridApi on scope
                    $scope.gridApi = gridApi;
                    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {

                        //console.log(rowEntity);
                        // {"id":1,"equipment":{"id":1,"name":"Гидравлическое оборудование"},"name":"Насосы шестеренчатые","intensity":1.3E-5}

                        if (newValue !== oldValue) {
                            var data = [{
                                id: rowEntity.id,
                                equipment: {
                                    id: rowEntity.equipid,
                                    name: rowEntity.equipname,
                                },
                                name: rowEntity.elem,
                                intensity: rowEntity.lambda
                            }];

                            $http.put('/api/asu_element/', JSON.stringify(data))
                                .then(function(response) {
                                    $scope.msg.resp = "Данные сохранены!";
                                }, function(response) {
                                    $scope.msg.resp = "Данные сохранены.";

                                });
                        }

                        $scope.$apply();
                    });
                };


                $scope.submitFormAddElement = function() {
                    if (($scope.selectedEquipmentId !== undefined) && ($scope.elemName !== undefined) && ($scope.elemLambda !== undefined)) {

                        var data = [{

                            equipment: {
                                id: parseInt($scope.selectedEquipmentId, 10),
                                name: $scope.equipmentSelectData.availableOptions[$scope.selectedEquipmentId - 1].name
                            },
                            name: $scope.elemName,
                            intensity: $scope.elemLambda
                        }];


                        $http.put('/api/asu_element/', JSON.stringify(data))
                            .then(function(response) {
                                $scope.msg.resp = response;
                                var obj = {
                                    "id": response.data[0].id,
                                    "elem": data[0].name,
                                    "lambda": data[0].intensity,
                                    "equipid": data[0].equipment.id,
                                    "equiname": data[0].equipment.name,
                                };

                                modelData.push(obj);
                            }, function(response) {
                                $scope.msg.resp = "Данные добавлены!";



                            });
                    } else {
                        window.alert("Введите все данные");
                    }


                };




                $scope.showUsers = function() {
                    hideAll();
                    $scope.show_users = true;
                }








            };
            return ["$scope", "$resource", "$http", AuthController];
        });


}(define));
