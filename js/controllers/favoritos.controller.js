(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('FavoritosController', FavoritosController);
  
//  FavoritosController.$inject = ['$scope'];
  
  function FavoritosController() {
    var vm = this;
    vm.title = 'Favoritos view';


    activate();

    ////////////////

    function activate() {}
  }
})();