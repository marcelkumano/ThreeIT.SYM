/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, param, $http) {

    $scope.item = param;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    //$scope.diaSemanaBr = appGlobalData.formatarStringDataAbrvPTbr($scope.item.agendamento.horarioInicial);
});
