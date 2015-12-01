/* Controllers */

agendamentoControllers.controller('sym.agendamento.pesquisa-filtros',
    function ($scope, $timeout, $http, $location, appGlobalData) {

        //Inicia controles
        $scope.contador = 5;
        $scope.quando = 01;
        $scope.uni = 01;
        $scope.possuiProjetor = 0;

        //Pesquisa Unidades
        $http.get('/sym/services/api/unidade')
        .then(function successCallback(response) {
            $scope.lista = response.data;
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

        $scope.testeAgendamento = function () {
            var data = {
                CodigoSalaReuniao: 1,
                DescricaoAgendamento: "Novo Agendamento",
                DataHoraInicial: "2015-12-01T10:00:00.000",
                DataHoraFinal: "2015-12-01T10:29:59.000"
            };

            var getUrl = '/sym/services/api/DisponibilidadeSala?CodigoSalaReuniao=' + data.CodigoSalaReuniao
                                                            + '&DataHoraInicial=' + data.DataHoraInicial
                                                            + '&DataHoraFinal=' + data.DataHoraFinal


            ///Chamada para validar a disponibilidade da sala
            $http.get(getUrl)
            .then(function successCallback(response) {

                //realiza a inclusão
                $http.post('/sym/services/api/salasreservadas', data)
                .then(function successCallback(response) {
                    
                    alert('incluído com sucesso');

                },
                function errorCallback(response) {
                    appGlobalData.errorResponse = response;
                    $location.path('ops');
                });

            },
            function errorCallback(response) {
                appGlobalData.errorResponse = response;
                $location.path('ops');
            });



        }
    }
);