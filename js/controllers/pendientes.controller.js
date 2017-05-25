(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('PendientesController', PendientesController);
  
//  PendientesController.$inject = ['$scope'];
  
  function PendientesController() {
    var vm = this;
    vm.title = 'Pendientes view';


    activate();

    ////////////////

    function activate() {}
  }
})();