(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('LastestController', LastestController);

//  LastestController.$inject = ['$scope'];

  function LastestController() {
    var vm = this;
    vm.title = 'Lastest view';


    activate();

    ////////////////

    function activate() {}
  }
})();
