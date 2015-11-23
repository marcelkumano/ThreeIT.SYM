angular.module('sym.pesquisa-agendamento', ['ngAnimate', 'ui.bootstrap']);

angular.module('sym.pesquisa-agendamento').controller('sym.pesquisa-agendamento.contador-pessoas', 
    function ($scope, $timeout) {
        
        $scope.contador = 0;

        //Aumenta pessoas na sala
        $scope.aumentar = function () {
            $timeout($scope.contador++,1000);
        };

        //Subtrai pessoas na sala
        $scope.diminuir = function ()
        {
            $timeout($scope.contador--, 1000);
        }
    }
);


angular.module('sym.pesquisa-agendamento').controller('sym.pesquisa-agendamento.lista-local',
    function ($scope, $window, $http) {
        //$http.get('http://localhost/sym.pesquisa-agendamento').success(function(data){
        //    $scope.lista = data;
        //});

        $scope.lista = [{ id:0, local:'Consolação' },
                          { id:1, local:'Major Quedinho' },
                          { id:2, local:'JB' },
                          { id:3, local:'Canadá' }];
        //$scope.lista = [];
    }
);


angular.module('sym.pesquisa-agendamento').controller('sym.pesquisa-agendamento.filtrar-salas',
    function ($scope, $window, $http) {
        $scope.filtrar = function()
        {
            
        }
    }
);