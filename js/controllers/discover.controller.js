(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('DiscoverController', DiscoverController);
  
//  ComingSoonController.$inject = ['$scope'];
  
  function DiscoverController() {
    var vm = this;
    vm.title = 'Discover view';


    activate();

    ////////////////

    function activate() {}
  }
})();
