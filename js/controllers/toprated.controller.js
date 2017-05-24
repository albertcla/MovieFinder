(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('TopRatedController', TopRatedController);

//  TopRatedController.$inject = ['$scope'];

  function TopRatedController() {
    var vm = this;
    vm.title = 'TopRated view';


    activate();

    ////////////////

    function activate() {}
  }
})();
