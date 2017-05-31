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
    vm.searchMovie = searchMovie;
    vm.searchTMDb = searchTMDb;
    vm.idToggle = idToggle;
    vm.singleFlag = singleFlag;
    
    vm.genres = [];
    vm.flag = false;

    activate();

    ////////////////

    function activate() {
      defaultFilter();
    }
    
    function defaultFilter(){
      vm.dateMax = 2017;
      vm.valMax = 9;
      vm.adult = true;
      vm.genres = [];
      searchTMDb(vm.dateMax,vm.valMax,vm.adult);
    }
    
    function searchTMDb(dateMax,valMax,adult,genres) {
      TMDbFactory.getPack(dateMax,valMax,adult,genres)
        .then(function (result) {
          vm.total = result.total;
          vm.pelis = result.pelis;
          vm.query = '';
      },
      function (error) {
        console.log('Ha habido un error al buscar la Peli');
        console.log(error);
      })
    }
    
    function searchMovie(query,adult) {
      TMDbFactory.getMovie(query,adult)
        .then(function (result) {
          vm.total = result.total;
          vm.pelis = result.pelis;
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
        vm.genres.splice(vm.genres.indexOf(id),1);
      }
    }
    
    function singleFlag() {
      vm.flag = !vm.flag;
    }
  }
})();