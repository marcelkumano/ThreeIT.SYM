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
        $http.get('service/pesquisa-local').success(function(data){
            $scope.lista = data;
        });

        $scope.unidade = { id: 0, local: '' };
        
    }
);



angular.module('sym.pesquisa-agendamento').controller('sym.pesquisa-salas.resultado', function ($scope, $uibModal, $log) {

    $scope.items = [{
        mes: "novembro", descricaoMes: "Novembro 2015", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    },
    {
        mes: "dezembro", descricaoMes: "Dezembro 2015", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    },
    {
        mes: "janeiro", descricaoMes: "Janeiro 2016", dias: [
            { numeroDia: 11, diaSemana: 'quarta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] },
            { numeroDia: 12, diaSemana: 'quinta-feira', horarios: [{ hora: "7:00" }, { hora: "8:00" }, { hora: "9:00" }, { hora: "10:00" }, { hora: "11:00" }] }
        ]
    }];

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal-agendamento.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return ['item1', 'item2', 'item3'];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});