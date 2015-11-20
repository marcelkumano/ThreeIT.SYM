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
        mes: "novembro", descricaoMes: "Novembro 2015", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    },
    {
        mes: "dezembro", descricaoMes: "Dezembro 2015", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    },
    {
        mes: "janeiro", descricaoMes: "Janeiro 2016", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    }];

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modalAgendamento.html',
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