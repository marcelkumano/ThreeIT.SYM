/* Controllers */

agendamentoControllers.controller('sym.agendamento.inclusao', function ($scope, $uibModalInstance, param) {

    $scope.items = param;

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.idSala = 1;
    $scope.sala = $scope.items.nomeSala;
    $scope.lugares = $scope.items.quantidadeLugares
    $scope.unidade = $scope.items.nomeUnidade;
    $scope.horario = $scope.items.horarioInicio;
    $scope.descricao = '';

    $scope.ClasseOK = "glyphicon glyphicon-ok sym-glyphicon-ok"
    $scope.ClasseNOK = "glyphicon glyphicon-remove sym-glyphicon-remove";

    $scope.ClasseInicio = $scope.ClasseOK;
    $scope.ClasseFim = $scope.ClasseOK;

    $scope.dataSourceDataInicio = {
        Horas: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30"],
        HoraSelecionada: { Hora: "08:00" }
    };

    //$scope.HorarioIni = {
    //    HoraInicio: [{ Hora: $scope.horario}, { Hora: '3:00' }, { Hora: "3:30" }]
    //    , HoraSelecionada: { Hora: "2:30" }
    //};

    //$scope.HorarioFim = {
    //    HoraFinal: [{ Hora: "3:00" }, { Hora: "3:30" }, { Hora: "4:00" }]
    //    , HoraSelecionada: { Hora: "3:00" }
    //};

    $scope.ok = function () {
        var postData = [
        CodigoReserva = 0,
        CodigoSalaReuniao = $scope.idSala,
        CodigoUsuario = 1,
        CodigoStatusReservaSala = 1,
        DataHoraInicial = '',
        DataHoraFinal = '',
        DescricaoAgendamento = $scope.descricao,
        DataAlteracao = '',
        CodigoUsuarioAlteracao = 1
        ]
        console.log(postData)
        $http.post('/sym/services/api/SalasReservadas', postData)
        .then(function successCallback(response) {

        }, function errorCallback(response) {

        });


        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.AlterarDataInicio = function () {
        //alert($scope.dataSourceDataInicio.HoraSelecionada.Hora);


    };

    $scope.AlterarDataFim = function () {
        //alert($scope.HorarioFim.HoraSelecionada.Hora);

        $scope.dataSourceDataFim = $scope.ObterHorariosFim($scope.dataSourceDataInicio.HoraSelecionada.Hora);

        $http.get('/sym/services/api/validarhorario?CodigoSalaReuniao=' + $scope.idSala
                                                 + '&DataHoraInicial=' + 0
                                                 + '&DataHoraFinal=' + 0)
            .then(function successCallback(response) {
                $scope.ClasseFim = $scope.ClasseOK;
            }, function errorCallback(response) {
                $scope.ClasseFim = $scope.ClasseNOK;
            });
    };

    ///dataInicio == '08:00'
    $scope.ObterHorariosFim = function (horarioInicio) {

        var dados = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                     "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                     "16:00", "16:30", "17:00", "17:30", "18:00"];

        var dadosRetorno = {
            Horas: [],
            HoraSelecionada: { Hora: "" }
        };
        var encontrou = false;

        angular.forEach(dados, function (horario) {

            if (encontrou) {
                if (dadosRetorno.HoraSelecionada.Hora == "") {
                    dadosRetorno.HoraSelecionada.Hora = horario;
                }

                dadosRetorno.Horas.push(horario);
            }

            if (horario == horarioInicio) {
                encontrou = true;
            }

        });

        return dadosRetorno;

    }

    $scope.dataSourceDataFim = $scope.ObterHorariosFim("08:00");
});