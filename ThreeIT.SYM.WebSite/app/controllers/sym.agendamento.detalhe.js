/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, $filter, param, $http) {

    $scope.item = param;

    $scope.sameUser = false;
    $scope.salaIndisponivel = true;

    if (param.nomeSala == 'Paixão') {
        $scope.sameUser = true;
        $scope.salaIndisponivel = false;
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
    
    //$scope.diaSemanaBr = appGlobalData.formatarStringDataAbrvPTbr($scope.item.agendamento.horarioInicial);
});
