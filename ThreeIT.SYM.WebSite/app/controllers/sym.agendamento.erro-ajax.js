/* Controllers */
agendamentoControllers.controller('sym.agendamento.erro-ajax', function ($scope, $routeParams, appGlobalData) {
    $scope.exibirDetalhesTecnicos = false;
    $scope.errorResponse = appGlobalData.errorResponse;
});
