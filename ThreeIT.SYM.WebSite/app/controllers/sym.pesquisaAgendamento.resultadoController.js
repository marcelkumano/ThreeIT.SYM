/* Controllers */

pesquisaAgendamentoControllers.controller('sym.pesquisaAgendamento.resultadoController', function ($scope, $http, $uibModal, $log, $routeParams, appGlobalData) {

    $scope.params = $routeParams;

    $http.get('/sym/services/api/salasreservadas?qtdpessoas=' + $scope.params.lugares
                                              + '&idunidade=' + $scope.params.onde
                                              + '&rangedata=' + $scope.params.quando)
    .then(function successCallback(response) {
        $scope.items = response.data.meses;
    },
    function errorCallback(response) {
        appGlobalData.errorResponse = response;
        $location.path('ops');

    });

    $scope.horarioComercial = function (dia) {

        if (dia.salas.length > 0) {

            var horarios = [];
            var horaInicio = new Date(dia.salas[0].horarioInicial).getHours();
            var horaFim = new Date(dia.salas[0].horarioFinal).getHours();

            for (var i = horaInicio; i <= horaFim; i++) {
                horarios.push(i);
            }

            return horarios;
        }

    };

    $scope.detalheSala = function (sala, hora) {

        var disponibilidade = {
            horarioQuebrado: false,
            primeiroLivre: true,
            segundoLivre: true,
        };

        angular.forEach(sala.reservas, function (value) {

            var horarioBase = new Date(0001, 1, 1, hora, 0);

            var horarioInicialHora = new Date(value.horarioInicial).getHours();
            var horarioInicialMinutos = new Date(value.horarioInicial).getMinutes();
            var horarioReservaInicio = new Date(0001, 1, 1, horarioInicialHora, horarioInicialMinutos);

            var horarioFinalHora = new Date(value.horarioFinal).getHours();
            var horarioFinalMinutos = new Date(value.horarioFinal).getMinutes();
            var horarioReservaFim = new Date(0001, 1, 1, horarioFinalHora, horarioFinalMinutos);

            if (horarioBase >= horarioReservaInicio && horarioBase <= horarioReservaFim) {
                disponibilidade.primeiroLivre = false;
            }

            horarioBase = new Date(0001, 1, 1, hora, 30);

            if (horarioBase >= horarioReservaFim && horarioBase <= horarioReservaFim) {
                disponibilidade.segundoLivre = false;
            }

            disponibilidade.horarioQuebrado = disponibilidade.primeiroLivre != disponibilidade.segundoLivre;

        });

        return disponibilidade;

    };

    $scope.primeiraLetra = function (valor) {

        var x = valor.toString();

        return x.substr(0, 1).toUpperCase();
    }

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal-agendamento.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return ['item1 XXX', 'item2 XXX', 'item3'];
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

pesquisaAgendamentoControllers.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

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