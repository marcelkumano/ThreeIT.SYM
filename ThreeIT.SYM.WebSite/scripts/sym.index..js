angular.module('sym.pesquisa-salas', []);

angular.module('sym.pesquisa-salas').controller('sym.pesquisa-salas.resultado', function ($scope, $log) {

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

});