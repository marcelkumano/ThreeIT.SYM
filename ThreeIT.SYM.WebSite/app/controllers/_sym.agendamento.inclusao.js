/* Controllers */

agendamentoControllers.controller('sym.agendamento.inclusao', function ($scope, $uibModalInstance, param) {

    $scope.item = param;

    $scope.ok = function () {
        $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});