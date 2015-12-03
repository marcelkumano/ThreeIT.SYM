'use strict';

/* App Module */

var agendamentoApp = angular.module('sym.agendamento', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'sym.agendamento.controllers'
]);

agendamentoApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/pesquisa/:lugares/:quando/:onde/:possuiProjetor', {
            templateUrl: '/sym/app/views/sym.agendamento.pesquisa-resultado.html',
            controller: 'sym.agendamento.pesquisa-resultado'
        }).
        when('/ops', {
            templateUrl: '/sym/app/views/sym.falha-ajax.html',
            controller: 'sym.agendamento.erro-ajax'
        }).
        when('/filtro', {
            templateUrl: '/sym/app/views/sym.agendamento.pesquisa-filtro.html'
        }).
        when('/', {
            templateUrl: '/sym/app/views/sym.login.html',
            controller: 'sym.login'
        })
  }]);

agendamentoApp.factory('appGlobalData', function () {
    return {
        Informacao: 'ABC',

        formatarStringDataAbrvPTbr: function (date) {

            var diaDaSemana = [{ completo: "domingo", abreviado: "dom" },
                               { completo: "segunda-feira", abreviado: "seg" },
                               { completo: "terça-feira", abreviado: "ter" },
                               { completo: "quarta-feira", abreviado: "qua" },
                               { completo: "quinta-feira", abreviado: "qui" },
                               { completo: "sexta-feira", abreviado: "sex" },
                               { completo: "sábado", abreviado: "sáb" }]

            var mes = [{ completo: "janeiro", abreviado: "jan" },
                       { completo: "fevereiro", abreviado: "fev" },
                       { completo: "março", abreviado: "mar" },
                       { completo: "abril", abreviado: "abr" },
                       { completo: "maio", abreviado: "mai" },
                       { completo: "junho", abreviado: "jun" },
                       { completo: "julho", abreviado: "jul" },
                       { completo: "agosto", abreviado: "ago" },
                       { completo: "setembro", abreviado: "set" },
                       { completo: "outubro", abreviado: "out" },
                       { completo: "novembro", abreviado: "nov" },
                       { completo: "dezembro", abreviado: "dez" }]


            date = new Date();

            return diaDaSemana[date.getDay()].abreviado + ', ' + date.getDate() + ' de ' + mes[date.getMonth()].abreviado + ' de ' + date.getFullYear();

        }
    };
});

var routeLoadingIndicator = function ($rootScope, $timeout) {


    return {
        restrict: 'E',
        template: "<div class='loader' ng-if='isRouteLoading'><h1>Carregando...</div>",
        link: function (scope, elem, attrs) {
            scope.isRouteLoading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isRouteLoading = true;
                window.scrollTo(0, 0);
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isRouteLoading = false;
            });
        }
    };
};

routeLoadingIndicator.$inject = ['$rootScope', '$timeout'];
agendamentoApp.directive('routeLoadingIndicator', routeLoadingIndicator);

/* Controllers */

var agendamentoControllers = angular.module('sym.agendamento.controllers', []);