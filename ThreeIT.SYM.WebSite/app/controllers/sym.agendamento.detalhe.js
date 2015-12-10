/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, $filter, param, $http) {

    $scope.item = param;

    $scope.sameUser = false;
    $scope.salaIndisponivel = true;
    $scope.reagendarSala = false;

    if (param.nomeSala == 'Paixão') {
        $scope.sameUser = true;
        $scope.salaIndisponivel = false;
    }

    if (param.nomeSala == 'Extraordinário') {
        $scope.sameUser = false;
        $scope.salaIndisponivel = false;
        $scope.reagendarSala = true;
    }

    var dataFim = new Date(param.agendamento.horarioFinal);
    dataFim.setMinutes(dataFim.getMinutes() + 1);

    $scope.horarioInicial = $filter('date')(new Date(param.agendamento.horarioInicial), "HH:mm", '-0000');
    $scope.horarioFinal = $filter('date')(dataFim, "HH:mm", '-0000');

    $scope.dataExibicao = $filter('date')(new Date(param.agendamento.horarioInicial), "EEE, dd 'de' MMM 'de' yyyy", '-0000');

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.ocuparSala = function () {
        //Ocupa a sala e retorna mensagem de sucesso

    };
    
    $scope.ok = function () {

        var dataHoraInicio = new Date(Date.UTC(param.horarioInicio.getUTCFullYear(),
                                               param.horarioInicio.getUTCMonth(),
                                               param.horarioInicio.getUTCDate(),
                                               $scope.horarioInicial.split(':')[0],
                                               $scope.horarioInicial.split(':')[1]));

        var dataHoraFim = new Date(Date.UTC(param.horarioInicio.getUTCFullYear(),
                                            param.horarioInicio.getUTCMonth(),
                                            param.horarioInicio.getUTCDate(),
                                            $scope.horarioFinal.split(':')[0],
                                            $scope.horarioFinal.split(':')[1]));

        var data = {
            CodigoSalaReuniao: $scope.codigoSala,
            DescricaoAgendamento: "Novo Agendamento",
            DataHoraInicial: dataHoraInicio.toJSON(),
            DataHoraFinal: dataHoraFim.toJSON()
        };

        $http.post('/sym/services/api/salasreservadas', data)
        .then(function successCallback(response) {

            $uibModalInstance.close('OK');

        },
        function errorCallback(response) {

            if (response.status == 409) {
                $scope.horarioDisponivel = false;
                retur;
            }

            appGlobalData.errorResponse = response;
            $location.path('ops');
        });


    };
});
