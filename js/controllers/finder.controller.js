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
    vm.searchMovies = searchMovies;
    vm.searchDetails = searchDetails;
    vm.idToggle = idToggle;
    vm.changeFlag = changeFlag;

    vm.pelis = [];
    vm.page = 1;
    vm.genres = [];
    vm.singleFlag = false;
    vm.discoverFlag = true;
    vm.type = 'discover';

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
      if (vm.type == 'upcoming' || vm.type == 'query' || vm.type == 'latest') {
        vm.pelis = [];
        vm.type = 'discover';
      }
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

    function searchLatest(page) {
      if (vm.type == 'discover' || vm.type == 'query' || vm.type == 'upcoming') {
        vm.pelis = [];
        vm.type = 'latest';
      }
      TMDbFactory.getLatest(page)
        .then(function (result) {
          vm.total = result.total;
            vm.pelis = vm.pelis.concat(result.pelis);
            vm.query = '';
        }, 
        function (error) {
            console.log('Ha habido un error al buscar la última Peli');
            console.log(error);
          })
    }

    function searchUpcoming(page) {
      if (vm.type == 'discover' || vm.type == 'query' || vm.type == 'latest') {
        vm.pelis = [];
        vm.type = 'upcoming';
      }
      TMDbFactory.getUpcoming(page)
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

    function nextPage(section) {
      vm.page++;
      if (section == 'discover') {
        searchPack(vm.dateMax, vm.valMax, vm.adult, vm.genres, vm.page);
      } else if (section == 'upcoming') {
        searchUpcoming(vm.page);
      } else if (section == 'query') {
        searchMovies(vm.query, vm.adult, vm.page);
      } else if (section == 'latest') {
        searchLatest(vm.page);
      }
    }

    function searchMovies(query, adult, page) {
      if (vm.type == 'discover' || vm.type == 'upcoming' || vm.type == '') {
        vm.pelis = [];
        vm.type = 'query';
      }
      TMDbFactory.getMovies(query, adult, page)
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
