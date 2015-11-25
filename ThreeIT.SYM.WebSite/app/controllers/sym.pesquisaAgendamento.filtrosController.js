pesquisaAgendamentoControllers.controller('sym.pesquisa-agendamento.contador-pessoas',
    function ($scope, $timeout) {

        $scope.contador = 0;

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


pesquisaAgendamentoControllers.controller('sym.pesquisa-agendamento.lista-local',
    function ($scope, $window, $http) {

        $http.get('/sym/app/views/servico-pesquisa-local.txt')
        .then(function successCallback(response) {
            $scope.lista = response.data.ListaUnidades;
        },
        function errorCallback(response) {
            alert(response.status + ' - ' + response.statusText);
        });
    }
);


pesquisaAgendamentoControllers.controller('sym.pesquisa-agendamento.filtrar-salas',
    function ($scope, $location) {
        $scope.filtrar = function (cont) {
            
            //Validar obrigatoriedade dos campos
            $scope.contador;
            
            cont;
            url = 'pesquisa/4/semana/consolacao';
            $location.path(url);
        }
    }
);