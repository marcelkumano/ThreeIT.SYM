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
    return { Informacao: 'asdasdasdasd' };
});

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

                scope.isRouteLoading = false;

            });
        }
    };
};

routeLoadingIndicator.$inject = ['$rootScope', '$timeout'];
agendamentoApp.directive('routeLoadingIndicator', routeLoadingIndicator);

/* Controllers */

var agendamentoControllers = angular.module('sym.agendamento.controllers', []);