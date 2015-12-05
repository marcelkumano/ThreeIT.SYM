/* Controllers */

agendamentoControllers.controller('sym.login',
    function ($scope, $timeout, $http, $location, appGlobalData) {

        $scope.wrongUserPass = false;

        $scope.login = function (){

            var usuario = $scope.usuario;
            var senha = $scope.senha;
            if (usuario == 'padrao' && senha == '123') {
                $location.path('filtro');
            }
            else {
                $scope.wrongUserPass = true;
            }
            
        }
    }
);

