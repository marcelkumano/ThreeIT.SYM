/* Controllers */

pesquisaAgendamentoControllers.controller('sym.pesquisaAgendamento.filtrosController',
    function ($scope, $timeout, $http) {

        //Inicia controles
        $scope.contador = 5;
        $scope.quando = 01;
        $scope.uni = 01;

        //Pesquisa Unidades
        $http.get('/sym/app/views/servico-pesquisa-local.txt')
        .then(function successCallback(response) {
            $scope.lista = response.data.ListaUnidades;
        },
        function errorCallback(response) {
            alert(response.status + ' - ' + response.statusText);
        });


        //Aumenta pessoas na sala
        $scope.aumentar = function () {
            $timeout($scope.contador++, 1000);
        };

        //Subtrai pessoas na sala
        $scope.diminuir = function () {
            $timeout($scope.contador--, 1000);
            if ($scope.contador < 0) {
                $scope.contador = 0;
            }
            
        }
    }
);