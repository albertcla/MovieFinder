(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('FinderController', FinderController);

  FinderController.$inject = ['TMDbFactory'];

  /* @ngInject */
  function FinderController(TMDbFactory) {
    var vm = this;
    vm.defaultFilter = defaultFilter;
    vm.searchPack = searchPack;
    vm.searchLatest = searchLatest;
    vm.searchUpcoming = searchUpcoming;
    vm.nextPage = nextPage;
    vm.searchMovie = searchMovie;
    vm.searchDetails = searchDetails;
    vm.searchTop = searchTop;
    vm.idToggle = idToggle;
    vm.changeFlag = changeFlag;

    vm.pelis = [];
    vm.page = 1;
    vm.genres = [];
    vm.singleFlag = false;
    vm.discoverFlag = true;

    activate();

    ////////////////

    function activate() {
      defaultFilter();
    }

    function defaultFilter() {
      vm.dateMax = 2017;
      vm.valMax = 9;
      vm.adult = true;
      vm.genres = [];
      vm.page = 1;
      vm.pelis = [];
      searchPack(vm.dateMax, vm.valMax, vm.adult, vm.genres, vm.page);
    }

    function searchPack(dateMax, valMax, adult, genres, page) {
      TMDbFactory.getPack(dateMax, valMax, adult, genres, page)
        .then(function (result) {
            vm.total = result.total;
            vm.pelis = vm.pelis.concat(result.pelis);
            vm.query = '';
          },
          function (error) {
            console.log('Ha habido un error al buscar las Pelis');
            console.log(error);
          })
    }
    
    function searchLatest() {
      TMDbFactory.getLastest()
        .then()
    }
    
    function searchUpcoming() {
      TMDbFactory.getUpcoming()
        .then()
    }

    function nextPage() {
      vm.page++;
      searchPack(vm.dateMax, vm.valMax, vm.adult, vm.genres, vm.page);
    }

    function searchMovie(query, adult) {
      TMDbFactory.getMovie(query, adult, page)
        .then(function (result) {
            vm.total = result.total;
            vm.pelis = result.pelis;
          },
          function (error) {
            console.log('Ha habido un error al buscar la Peli');
            console.log(error);
          })
    }

    function searchDetails(id) {
      TMDbFactory.getDetails(id)
        .then(function (result) {
            vm.details = result;
            changeFlag('singleFlag');
          },
          function (error) {
            console.log('Ha habido un error al buscar los detalles');
            console.log(error);
          })
    }

    function searchTop(page) {
      TMDbFactory.getTop(page)
        .then(function (result) {
            vm.pelis = result;
          },
          function (error) {
            console.log('Ha habido un error al buscar los top rated');
            console.log(error);
          })
    }

    function idToggle(id) {
      if (vm.genres.indexOf(id) == -1) {
        vm.genres.push(id);
      } else {
        vm.genres.splice(vm.genres.indexOf(id), 1);
      }
    }

    function changeFlag(flag) {
      vm[flag] = !vm[flag];
    }
  }
})();
