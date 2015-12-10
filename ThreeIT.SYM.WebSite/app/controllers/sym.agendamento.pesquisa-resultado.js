/* Controllers */

agendamentoControllers.controller('sym.agendamento.pesquisa-resultado', function ($scope, $http, $uibModal, $routeParams, $location, appGlobalData) {

    $scope.params = $routeParams;
    $scope.$parent.isRouteLoading = true;

    $http.get('/sym/services/api/salasreservadas?quantidadePessoas=' + $scope.params.lugares
                                              + '&codigoUnidade=' + $scope.params.onde
                                              + '&intervaloData=' + $scope.params.quando
                                              + '&possuiProjetor=' + ($scope.params.possuiProjetor == "1" ? 'true' : ''))
    .then(function successCallback(response) {
        $scope.items = response.data.meses;

        //Gerar uma lista com todas as horas que devem ser exibidas no GRID
        $scope.processarHorasDisponiveis();

        //Para cada hora exibida gerar a model para cada sala.
        $scope.processarDetalheSala();

        $scope.$parent.isRouteLoading = false;

    },
    function errorCallback(response) {
        appGlobalData.errorResponse = response;
        $location.path('ops');
    });

    $scope.processarHorasDisponiveis = function () {

        angular.forEach($scope.items, function (mes) {

            angular.forEach(mes.dias, function (dia) {
                dia.horasDisponiveis = $scope.horasDisponiveis(dia);
            });
        });
    };

    $scope.horasDisponiveis = function (dia) {

        if (dia.salas.length > 0) {

            var horarios = [];
            var horaInicio = new Date(dia.salas[0].horarioInicial).getUTCHours();
            var horaFim = new Date(dia.salas[0].horarioFinal).getUTCHours() - 1;

            for (var i = horaInicio; i <= horaFim; i++) {
                horarios.push({ hora: i });
            }

            return horarios;
        }

    };

    $scope.processarDetalheSala = function () {

        angular.forEach($scope.items, function (mes) {

            angular.forEach(mes.dias, function (dia) {

                angular.forEach(dia.horasDisponiveis, function (detalheHorario) {

                    $scope.detalheSalaArray(mes, dia, dia.salas, detalheHorario);

                });
            });
        });
    };

    $scope.detalheSalaArray = function (mes, dia, salas, detalheHorario) {

        detalheHorario.salas = [];

        angular.forEach(salas, function (sala) {

            var detalheSala = { dia: undefined };

            detalheSala.dia = new Date(Date.UTC(mes.ano, mes.numeroMes - 1, dia.numeroDia));
            detalheSala.codigoUnidade = sala.codigoUnidade;
            detalheSala.nomeUnidade = sala.nomeUnidade;
            detalheSala.codigoSala = sala.codigoSala;
            detalheSala.nomeSala = sala.nomeSala;
            detalheSala.quantidadeLugares = sala.quantidadeLugares;

            detalheSala.horarioFuncionamentoSalaInicial = new Date(sala.horarioInicial);
            detalheSala.horarioFuncionamentoSalaFinal = new Date(sala.horarioFinal);

            $scope.detalheReservaSala(sala, detalheHorario.hora, detalheSala);

            detalheHorario.salas.push(detalheSala);

        });

    }

    $scope.detalheReservaSala = function (sala, hora, detalheSala) {

        detalheSala.horarioQuebrado = false;

        detalheSala.primeiroPeriodoLivre = true;
        detalheSala.segundoPeriodoLivre = true;

        detalheSala.inicioPrimeiroPeriodo = new Date(Date.UTC(detalheSala.dia.getUTCFullYear(), detalheSala.dia.getUTCMonth(), detalheSala.dia.getUTCDate(), hora, 0));
        detalheSala.inicioSegundoPeriodo = new Date(Date.UTC(detalheSala.dia.getUTCFullYear(), detalheSala.dia.getUTCMonth(), detalheSala.dia.getUTCDate(), hora, 30));

        angular.forEach(sala.reservas, function (value) {

            var horarioInicialHora = new Date(value.horarioInicial).getUTCHours();
            var horarioInicialMinutos = new Date(value.horarioInicial).getUTCMinutes();
            var horarioReservaInicio = new Date(Date.UTC(detalheSala.dia.getUTCFullYear(), detalheSala.dia.getUTCMonth(), detalheSala.dia.getUTCDate(), horarioInicialHora, horarioInicialMinutos));

            var horarioFinalHora = new Date(value.horarioFinal).getUTCHours();
            var horarioFinalMinutos = new Date(value.horarioFinal).getUTCMinutes();
            var horarioReservaFim = new Date(Date.UTC(detalheSala.dia.getUTCFullYear(), detalheSala.dia.getUTCMonth(), detalheSala.dia.getUTCDate(), horarioFinalHora, horarioFinalMinutos));

            if (detalheSala.inicioPrimeiroPeriodo >= horarioReservaInicio && detalheSala.inicioPrimeiroPeriodo <= horarioReservaFim) {
                detalheSala.agendamento = value
                detalheSala.primeiroPeriodoLivre = false;
                detalheSala.primeiroPeriodoExpirou = value.expirouLimiteOcupacao
            }

            if (detalheSala.inicioSegundoPeriodo >= horarioReservaInicio && detalheSala.inicioSegundoPeriodo <= horarioReservaFim) {
                detalheSala.agendamento = value
                detalheSala.segundoPeriodoLivre = false;
                detalheSala.segundoPeriodoExpirou = value.expirouLimiteOcupacao
            }
        });

        
        detalheSala.horarioQuebrado = detalheSala.primeiroPeriodoLivre != detalheSala.segundoPeriodoLivre;

    };

    $scope.primeiraLetra = function (valor) {

        var x = valor.toString();

        return x.substr(0, 1).toUpperCase();
    }

    $scope.abrirDetalhe = function (periodo, param) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/sym/app/views/sym.agendamento.detalhe.html',
            controller: 'sym.agendamento.detalhe',
            size: 'md',
            resolve: {
                param: function () {
                    return {
                        codigoSala: param.codigoSala,
                        nomeSala: param.nomeSala,
                        codigoUnidade: param.codigoUnidade,
                        nomeUnidade: param.nomeUnidade,
                        quantidadeLugares: param.quantidadeLugares,
                        agendamento: param.agendamento
                    };
                }
            }
        });

    };

    $scope.abrirInclusao = function (periodo, param) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/sym/app/views/sym.agendamento.inclusao.html',
            controller: 'sym.agendamento.inclusao',
            size: 'md',
            resolve: {
                param: function () {
                    return {
                        codigoSala: param.codigoSala,
                        nomeSala: param.nomeSala,
                        codigoUnidade: param.codigoUnidade,
                        nomeUnidade: param.nomeUnidade,
                        quantidadeLugares: param.quantidadeLugares,
                        horarioInicio: periodo == 'segundo' ? param.inicioSegundoPeriodo : param.inicioPrimeiroPeriodo,
                        horarioFuncionamentoSalaInicial: param.horarioFuncionamentoSalaInicial,
                        horarioFuncionamentoSalaFinal: param.horarioFuncionamentoSalaFinal,
                        quantidadeMinutos: periodo == 'integral' ? 60 : 30
                    };
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $location.path('pesquisa/' + $scope.params.lugares + '/' + $scope.params.onde + '/' + $scope.params.quando + '/' + $scope.params.possuiProjetor + '/' + appGlobalData.RandomNumber());
        });
    };











    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ["dd 'de' MMM 'de' yyyy", 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };





});

