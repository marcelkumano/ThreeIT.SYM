/* Controllers */

agendamentoControllers.controller('sym.agendamento.pesquisa-filtros',
    function ($scope, $timeout, $http, $location, appGlobalData) {

        //Inicia controles
        $scope.contador = 5;
        $scope.quando = 01;
        $scope.uni = 01;
        $scope.possuiProjetor = 0;
        $scope.randomNumber = appGlobalData.RandomNumber();


        $scope.$parent.$parent.isRouteLoading = true;

        //Pesquisa Unidades
        $http.get('/sym/services/api/unidade')
        .then(function successCallback(response) {
            $scope.lista = response.data;
            $scope.$parent.$parent.isRouteLoading = false;
        },
        function errorCallback(response) {
            appGlobalData.errorResponse = response;
            $location.path('ops');
        });


        //Aumenta pessoas na sala
        $scope.aumentar = function () {
            $timeout($scope.contador++, 1000);
        };

        //Subtrai pessoas na sala
        $scope.diminuir = function () {
            $timeout($scope.contador--, 1000);
            if ($scope.contador < 2) {
                $scope.contador = 2;
            }

        }
    }
);