(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('DiscoverController', DiscoverController);
  
  DiscoverController.$inject = ['TMDbFactory'];
  
  function DiscoverController(TMDbFactory) {
    var vm = this;
    vm.title = 'Discover view';


    activate();

    ////////////////

    function activate() {
      searchTMDb();
    }
    
    function searchTMDb() {
      TMDbFactory.getPack()
        .then(function (result) {
          vm.pelis = result;
      },
      function (error) {
        console.log('Ha habido un error al buscar la Peli');
        console.log(error);
      })
    }
  }
})();

