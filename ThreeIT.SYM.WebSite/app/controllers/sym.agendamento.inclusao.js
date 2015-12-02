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
    $scope.ClasseFim = $scope.ClasseNOK;
    $scope.HorarioIni = {
        HoraInicio: [{ Hora: $scope.horario}, { Hora: '3:30' }, { Hora: "3:30" }]
        , HoraSelecionada: { Hora: "2:30" }
    };
    $scope.HorarioFim = {
        HoraFinal: [{ Hora: "3:00" }, { Hora: "3:30" }, { Hora: "4:00" }]
        , HoraSelecionada: { Hora: "3:00" }
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.AlterarDataInicio = function () {
        alert($scope.HorarioIni.HoraSelecionada.Hora);

        $http.get('/sym/services/api/validarhorario')
            .then(function successCallback(response) {
                $scope.ClasseFim = $scope.ClasseOK;
            }, function errorCallback(response) {
                $scope.ClasseFim = $scope.ClasseNOK;
            });
    };

    $scope.AlterarDataFim = function () {
        alert($scope.HorarioFim.HoraSelecionada.Hora);

        $http.get('/sym/services/api/validarhorario')
            .then(function successCallback(response) {
                $scope.ClasseFim = $scope.ClasseOK;
            }, function errorCallback(response) {
                $scope.ClasseFim = $scope.ClasseNOK;
            });
    };
});