'use strict';

/* App Module */

var pesquisaAgendamento = angular.module('sym.pesquisaAgendamento', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'sym.pesquisaAgendamento.controllers'
]);

pesquisaAgendamento.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/pesquisa/:lugares/:quando/:onde', {
            templateUrl: '/sym/app/views/sym.resultado-pesquisa-agendamento.html',
            controller: 'sym.pesquisaAgendamento.resultadoController'
        }).
        when('/', {
            templateUrl: '/sym/app/views/sym.pesquisa-agendamento.html'
        })
  }]);


var routeLoadingIndicator = function ($rootScope, $timeout) {


    return {
        restrict: 'E',
        template: "<div class='loader' ng-if='isRouteLoading'><h1>Carregando...</div>",
        link: function (scope, elem, attrs) {
            scope.isRouteLoading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isRouteLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {

                $timeout(function () {
                    scope.isRouteLoading = false;
                }, 250);

            });
        }
    };
};

routeLoadingIndicator.$inject = ['$rootScope', '$timeout'];
pesquisaAgendamento.directive('routeLoadingIndicator', routeLoadingIndicator);

/* Controllers */

var pesquisaAgendamentoControllers = angular.module('sym.pesquisaAgendamento.controllers', []);