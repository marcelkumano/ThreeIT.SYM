/* Controllers */
agendamentoControllers.controller('sym.agendamento.erro-ajax', function ($scope, $routeParams, appGlobalData, $location) {
    $scope.exibirDetalhesTecnicos = false;
    $scope.errorResponse = appGlobalData.errorResponse;

    $scope.voltarInicio = function () {

        $location.path('');
    }

});
