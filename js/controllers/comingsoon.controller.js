(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('ComingSoonController', ComingSoonController);

//  ComingSoonController.$inject = ['$scope'];

  function ComingSoonController() {
    var vm = this;
    vm.title = 'ComingSoon view';


    activate();

    ////////////////

    function activate() {}
  }
})();
