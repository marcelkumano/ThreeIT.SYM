/* Controllers */

agendamentoControllers.controller('sym.agendamento.inclusao', function ($scope, $http, $filter, $uibModalInstance, param, appGlobalData) {
    
    var dataFinal = new Date(param.horarioInicio);
    dataFinal.setMinutes(param.quantidadeMinutos);

    $scope.codigoSala = param.codigoSala;
    $scope.nomeSala = param.nomeSala;
    $scope.quantidadeLugares = param.quantidadeLugares;

    $scope.nomeUnidade = param.nomeUnidade;

    $scope.horarioInicial = $filter('date')(param.horarioInicio, "HH:mm");
    $scope.horarioFinal = $filter('date')(dataFinal, "HH:mm");

    $scope.dataExibicao = $filter('date')(param.horarioInicio, "EEE, dd 'de' MMM 'de' yyyy");
    

    $scope.dataSourceDataInicio = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                                    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                                    "16:00", "16:30", "17:00", "17:30"];

    $scope.ok = function () {

        var dataHoraInicio = new Date(param.horarioInicio.getFullYear(),
                                      param.horarioInicio.getMonth(),
                                      param.horarioInicio.getDate(),
                                      $scope.horarioInicial.split(':')[0],
                                      $scope.horarioInicial.split(':')[1]);

        var dataHoraFim = new Date(param.horarioInicio.getFullYear(),
                                   param.horarioInicio.getMonth(),
                                   param.horarioInicio.getDate(),
                                   $scope.horarioFinal.split(':')[0],
                                   $scope.horarioFinal.split(':')[1]);

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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.AlterarDataInicio = function () {
        
        $scope.horarioFinal = "";
        $scope.dataSourceDataFim = $scope.ObterHorariosFim($scope.horarioInicial)
        $scope.validarDisponibilidade();

    };

    $scope.AlterarDataFim = function () {

        $scope.validarDisponibilidade();

    };

    $scope.ObterHorariosFim = function (horarioInicio) {

        var dados = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                     "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                     "16:00", "16:30", "17:00", "17:30", "18:00"];

        var dadosRetorno = [];
        var encontrou = false;

        angular.forEach(dados, function (horario) {

            if (encontrou) {
                if ($scope.horarioFinal == "") {
                    $scope.horarioFinal = horario;
                }

                dadosRetorno.push(horario);
            }

            if (horario == horarioInicio) {
                encontrou = true;
            }

        });

        return dadosRetorno;

    }

    $scope.validarDisponibilidade = function () {

        var dataHoraInicio = new Date(param.horarioInicio.getFullYear(),
                                      param.horarioInicio.getMonth(),
                                      param.horarioInicio.getDate(),
                                      $scope.horarioInicial.split(':')[0],
                                      $scope.horarioInicial.split(':')[1]);

        var dataHoraFim = new Date(param.horarioInicio.getFullYear(),
                                   param.horarioInicio.getMonth(),
                                   param.horarioInicio.getDate(),
                                   $scope.horarioFinal.split(':')[0],
                                   $scope.horarioFinal.split(':')[1]);
        

        $http.get('/sym/services/api/DisponibilidadeSala?CodigoSalaReuniao=' + $scope.codigoSala
                                                     + '&DataHoraInicial=' + dataHoraInicio.toJSON()
                                                     + '&DataHoraFinal=' + dataHoraFim.toJSON())
            .then(function successCallback(response) {

                $scope.horarioDisponivel = true;

            }, function errorCallback(response) {
                
                //erro de conflito
                if (response.status == 409) {
                    $scope.horarioDisponivel = false;
                    return;
                }

                appGlobalData.errorResponse = response;
                $location.path('ops');

            });

    }

    $scope.dataSourceDataFim = $scope.ObterHorariosFim($scope.horarioInicial);
    $scope.validarDisponibilidade();
});