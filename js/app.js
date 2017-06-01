(function () {
  'use strict';

  angular
    .module('MovieFinder', ['ngRoute'])
    .config(config);
  config.$inject = ['$routeProvider', '$locationProvider'];
  
  function config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
      redirectTo: '/discover'
    })
    .when('/discover', {
      controller: 'FinderController',
      controllerAs: 'Discover',
      templateUrl: '/views/discover.html'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
})();