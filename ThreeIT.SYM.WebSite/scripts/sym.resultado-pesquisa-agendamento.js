angular.module('sym.pesquisa-salas', ['ngAnimate', 'ui.bootstrap']);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('sym.pesquisa-salas').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
    

angular.module('sym.pesquisa-salas').controller('sym.pesquisa-salas.resultado', function ($scope, $uibModal, $log) {

    $scope.items = [{
        numeroMes: 11,
        mes: "novembro",
        descricaoMes: "Novembro 2015",
        dias: [{
            numeroDia: 11,
            diaSemana: 'quarta-feira',
            horarios: [{
                hora: "7:00",
                salas: [{
                    primeiroHorario: 'indisponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }]
            }, {
                hora: "8:00",
                salas: [{
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }]
            }, {
                hora: "9:00",
                salas: [{
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }]
            }, {
                hora: "10:00",
                salas: [{
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }]
            }, {
                hora: "11:00",
                salas: [{
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }, {
                    primeiroHorario: 'disponivel',
                    segundoHorario: 'disponivel'
                }]
            }]
        }]
    }];


    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal-agendamento.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return  ['item1', 'item2', 'item3'];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});