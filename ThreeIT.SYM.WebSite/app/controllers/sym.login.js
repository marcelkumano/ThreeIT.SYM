/* Controllers */

agendamentoControllers.controller('sym.login',
    function ($scope, $timeout, $http, $location, appGlobalData) {

        $scope.login = function (){

            $location.path('filtro');
        }
    }
);

