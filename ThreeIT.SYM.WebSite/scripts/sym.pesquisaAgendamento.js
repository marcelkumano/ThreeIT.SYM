'use strict';

/*    App Module   */

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
            templateUrl: '/sym/app/views/resultado-pesquisa-agendamento.html',
            controller: 'sym.pesquisaAgendamento.resultadoController'
        }).
        when('/', {
            templateUrl: '/sym/app/views/pesquisa-agendamento.html',
            controller: 'sym.pesquisaAgendamento.filtrosController'
        })
  }]);

/* Controllers */

var pesquisaAgendamentoControllers = angular.module('sym.pesquisaAgendamento.controllers', []);