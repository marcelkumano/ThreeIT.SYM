/* Controllers */

agendamentoControllers.controller('sym.agendamento.detalhe', function ($scope, $uibModalInstance, param, $http) {

    $scope.item = param;

    $scope.ok = function () {
        $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    //Pesquisa Unidades
    $http.get('/sym/services/api/detalheReserva?consultarReserva=' + ($scope.item ? 'true' : ''))
    .then(function successCallback(response) {
        $scope.detalheAgendamento = response.data;
    },
    function errorCallback(response) {
        appGlobalData.errorResponse = response;
        $location.path('ops');
    });

});
