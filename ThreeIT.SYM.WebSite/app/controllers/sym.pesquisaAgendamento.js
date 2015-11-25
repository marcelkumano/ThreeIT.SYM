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
            templateUrl: 'sym.resultado-pesquisa-agendamento.html',
            controller: 'sym.pesquisaAgendamento.resultadoController'
        }).
        when('/', {
            templateUrl: 'sym.pesquisa-agendamento.html'
        })
  }]);

/* Controllers */

var pesquisaAgendamentoControllers = angular.module('sym.pesquisaAgendamento.controllers', []);