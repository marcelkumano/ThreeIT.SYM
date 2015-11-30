/* Controllers */

agendamentoControllers.controller('sym.agendamento.pesquisa-resultado', function ($scope, $http, $uibModal, $routeParams, $location, appGlobalData) {

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

    $scope.detalheSalaArray = function (salas, hora) {
        
        var detalheSalasPorHorario = [];

        angular.forEach(salas, function (sala) {

            var detalhe = {
                nomeSala: sala.nomeSala,
                quantidadeLugares: sala.quantidadeLugares,
                disponibilidade:  $scope.detalheSala(sala, hora)
            }

            detalheSalasPorHorario.push(detalhe);

        });

        return detalheSalasPorHorario;
    }

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

    $scope.abrirDetalhe = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'sym.agendamento.detalhe.html',
            controller: 'sym.agendamento.detalhe',
            size: 'md',
            resolve: {
                items: function () {
                    return ['item1 XXX', 'item2 XXX', 'item3'];
                }
            }
        });

    };

    $scope.abrirInclusao= function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'sym.agendamento.inclusao.html',
            controller: 'sym.agendamento.inclusao',
            size: 'md',
            resolve: {
                items: function () {
                    return ['item1 XXX', 'item2 XXX', 'item3'];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $location.path('pesquisa/' + $scope.params.lugares + '/' + $scope.params.onde + '/' + $scope.params.quando);
        });
    };

});

