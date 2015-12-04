/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, $filter, param, $http) {

    $scope.item = param;

    var dataFim = new Date(param.agendamento.horarioFinal);
    dataFim.setMinutes(dataFim.getMinutes() + 1);

    $scope.horarioInicial = $filter('date')(new Date(param.agendamento.horarioInicial), "HH:mm", '-0000');
    $scope.horarioFinal = $filter('date')(dataFim, "HH:mm", '-0000');

    $scope.dataExibicao = $filter('date')(new Date(param.agendamento.horarioInicial), "EEE, dd 'de' MMM 'de' yyyy", '-0000');

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    //$scope.diaSemanaBr = appGlobalData.formatarStringDataAbrvPTbr($scope.item.agendamento.horarioInicial);
});
