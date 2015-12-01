/* Controllers */

agendamentoControllers.controller('sym.agendamento.inclusao', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.idSala = 1;
    $scope.sala = "Missão";
    $scope.lugares = 6;
    $scope.unidade = "Consolação";
    $scope.horario = "terça-feira, 1 Nov 2015";

    $scope.ClasseOK = "glyphicon glyphicon-ok sym-glyphicon-ok"
    $scope.ClasseNOK = "glyphicon glyphicon-remove sym-glyphicon-remove";

    $scope.ClasseInicio = $scope.ClasseOK;
    $scope.ClasseFim = $scope.ClasseNOK;

    $scope.HoraInicio = function () {
        var horas = [];

        horas.push(230);
        horas.push(300);

        console.log(horas);
        return horas;
    };

    $scope.HoraFinal = function () {
        var horas = [];

        horas.push(455);
        horas.push(330);

        console.log(horas);
        return horas;
    };


    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.AlterarDataInicio = function (dataInicio) {



    };

    $scope.AlterarDataFim = function (dataFim) {


    };

    $scope.ValidarHorario = function (Data) {
        $http.get('/sym/services/api/validarhorario?Sala=' + $scope.idSala
                                      + '&quando=' + Data)
        .then(function successCallback(response) {
            $scope.ok = response.data.ok;
        },
        function errorCallback(response) {
            appGlobalData.errorResponse = response;
            $location.path('ops');
        });
    };


});