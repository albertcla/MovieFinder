(function() {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('FinderController', FinderController);

  FinderController.$inject = ['TMDbFactory'];

  /* @ngInject */
  function FinderController(TMDbFactory){
    var vm = this;
    vm.defaultFilter = defaultFilter;
    vm.searchTMDb = searchTMDb;
    vm.idToggle = idToggle;
    
    vm.genres = [];

    activate();

    ////////////////

    function activate() {
      defaultFilter();
    }
    
    function defaultFilter(){
      vm.dateMax = 2017;
      vm.valMax = 9;
      vm.adult = true;
      searchTMDb(vm.dateMax,vm.valMax,vm.adult);
    }
    
    function searchTMDb(dateMax,valMax,adult,genres) {
      TMDbFactory.getPack(dateMax,valMax,adult,genres)
        .then(function (result) {
          vm.pelis = result;
      },
      function (error) {
        console.log('Ha habido un error al buscar la Peli');
        console.log(error);
      })
    }
    
    function idToggle(id) {
      if (vm.genres.indexOf(id) == -1) {
        vm.genres.push(id);
      } else {
        vm.genres.splice(vm.genres.indexOf(id),id.length);
      }
    }
  }
})();