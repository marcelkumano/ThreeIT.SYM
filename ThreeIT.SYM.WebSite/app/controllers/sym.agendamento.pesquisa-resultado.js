/* Controllers */

agendamentoControllers.controller('sym.agendamento.pesquisa-resultado', function ($scope, $http, $uibModal, $routeParams, $location, appGlobalData) {

    $scope.params = $routeParams;

    $http.get('/sym/services/api/salasreservadas?qtdpessoas=' + $scope.params.lugares
                                              + '&idunidade=' + $scope.params.onde
                                              + '&rangedata=' + $scope.params.quando
                                              + '&possuiProjetor=' + ($scope.params.possuiProjetor ? 'true' : ''))
    .then(function successCallback(response) {
        $scope.items = response.data.meses;

        //Gerar uma lista com todas as horas que devem ser exibidas no GRID
        $scope.processarHorasDisponiveis();

        //Para cada hora exibida gerar a model para cada sala.
        $scope.processarDetalheSala();

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
            var horaInicio = new Date(dia.salas[0].horarioInicial).getHours();
            var horaFim = new Date(dia.salas[0].horarioFinal).getHours();

            for (var i = horaInicio; i <= horaFim; i++) {
                horarios.push({ hora: i, detalheSala: undefined });
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

            detalheSala.dia = new Date(mes.ano, mes.numeroMes - 1, dia.numeroDia);
            detalheSala.codigoUnidade = sala.codigoUnidade;
            detalheSala.nomeUnidade = sala.nomeUnidade;
            detalheSala.codigoSala = sala.codigoSala;
            detalheSala.nomeSala = sala.nomeSala;
            detalheSala.quantidadeLugares = sala.quantidadeLugares;

            $scope.detalheReservaSala(sala, detalheHorario.hora, detalheSala);

            detalheHorario.salas.push(detalheSala);

        });

    }

    $scope.detalheReservaSala = function (sala, hora, detalheSala) {

        detalheSala.horarioQuebrado = false;

        detalheSala.primeiroPeriodoLivre = true;
        detalheSala.segundoPeriodoLivre = true;

        detalheSala.inicioPrimeiroPeriodo = new Date(detalheSala.dia.getFullYear(), detalheSala.dia.getMonth(), detalheSala.dia.getDate(), hora, 0);
        detalheSala.inicioSegundoPeriodo = new Date(detalheSala.dia.getFullYear(), detalheSala.dia.getMonth(), detalheSala.dia.getDate(), hora, 30);

        angular.forEach(sala.reservas, function (value) {

            var horarioInicialHora = new Date(value.horarioInicial).getHours();
            var horarioInicialMinutos = new Date(value.horarioInicial).getMinutes();
            var horarioReservaInicio = new Date(detalheSala.dia.getFullYear(), detalheSala.dia.getMonth(), detalheSala.dia.getDate(), horarioInicialHora, horarioInicialMinutos);

            var horarioFinalHora = new Date(value.horarioFinal).getHours();
            var horarioFinalMinutos = new Date(value.horarioFinal).getMinutes();
            var horarioReservaFim = new Date(detalheSala.dia.getFullYear(), detalheSala.dia.getMonth(), detalheSala.dia.getDate(), horarioFinalHora, horarioFinalMinutos);

            if (detalheSala.inicioPrimeiroPeriodo >= horarioReservaInicio && detalheSala.inicioPrimeiroPeriodo <= horarioReservaFim) {
                detalheSala.primeiroPeriodoLivre = false;
            }

            if (detalheSala.inicioSegundoPeriodo >= horarioReservaFim && detalheSala.inicioSegundoPeriodo <= horarioReservaFim) {
                detalheSala.segundoPeriodoLivre = false;
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
                        horarioInicio: periodo == 'segundo' ? param.inicioSegundoPeriodo : param.inicioSegundoPeriodo,
                        quantidadeMinutos: periodo == 'integral' ? 60 : 30
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
                        quantidadeMinutos: periodo == 'integral' ? 60 : 30
                    };
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $location.path('pesquisa/' + $scope.params.lugares + '/' + $scope.params.onde + '/' + $scope.params.quando);
        });
    };

});

