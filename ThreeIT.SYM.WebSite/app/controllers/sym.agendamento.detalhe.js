/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, param, $http) {

    $scope.item = param;

    $scope.ok = function () {
        $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.diaSemanaBr = appGlobalData.formatarStringDataAbrvPTbr($scope.item.horarioInicio);
});
