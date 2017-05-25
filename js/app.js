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
      controller: 'DiscoverController',
      controllerAs: 'Discover',
      templateUrl: '/views/discover.html'
    })
    .when('/lastest', {
      controller: 'LastestController',
      controllerAs: 'Lastest',
      templateUrl: '/views/lastest.html'
    })
    .when('/toprated', {
      controller: 'TopRatedController',
      controllerAs: 'TopRated',
      templateUrl: '/views/toprated.html'
    })
    .when('/comingsoon', {
      controller: 'ComingSoonController',
      controllerAs: 'ComingSoon',
      templateUrl: '/views/comingsoon.html'
    })
    .when('/favoritos', {
      controller: 'FavoritosController',
      controllerAs: 'Favoritos',
      templateUrl: '/views/favoritos.html'
    })
    .when('/pendientes', {
      controller: 'PendientesController',
      controllerAs: 'Pendientes',
      templateUrl: '/views/pendientes.html'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
})();