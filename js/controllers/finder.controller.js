(function () {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('FinderController', FinderController);

  FinderController.$inject = ['TMDbFactory', 'MemoryFactory'];

  /* @ngInject */
  function FinderController(TMDbFactory, MemoryFactory) {
    var vm = this;
    vm.defaultFilter = defaultFilter;
    vm.searchPack = searchPack;
    vm.searchLatest = searchLatest;
    vm.searchUpcoming = searchUpcoming;
    vm.nextPage = nextPage;
    vm.searchMovies = searchMovies;
    vm.searchDetails = searchDetails;
    vm.toggleTo = toggleTo;
    vm.getList = getList;
    vm.idToggle = idToggle;
    vm.changeFlag = changeFlag;

    vm.pelis = [];
    vm.favoritos = [];
    vm.pendientes = [];
    vm.page = 1;
    vm.genres = [];
    vm.singleFlag = false;
    vm.discoverFlag = true;
    vm.favoritosFlag = false;
    vm.pendientesFlag = false;
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
    
//    The Movie Database

    function searchPack(dateMax, valMax, adult, genres, page) {
      if (vm.type == 'upcoming' || vm.type == 'query' || vm.type == 'latest' || vm.type == 'favoritos' || vm.type == 'pendientes') {
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
      if (vm.type == 'discover' || vm.type == 'query' || vm.type == 'upcoming' || vm.type == 'favoritos' || vm.type == 'pendientes') {
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
      if (vm.type == 'discover' || vm.type == 'query' || vm.type == 'latest' || vm.type == 'favoritos' || vm.type == 'pendientes') {
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
      if (vm.type == 'discover' || vm.type == 'upcoming' || vm.type == 'latest' || vm.type == 'favoritos' || vm.type == 'pendientes') {
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
    
//    localStorage
    
    function addTo(item, list) {
      vm[list].push(item);
    }
    
    function removeFrom(item,list) {
      vm[list].forEach(function(element,index) {
        if (element.id == item.id) {
          vm[list].splice(index,1);
        };
      });
    }
    
    function toggleTo(item,list) {
      inList(item,list);
      if (vm[list + 'Flag']) {
        removeFrom(item,list);
      } else {
        addTo(item, list);
      }
      MemoryFactory.save(list, vm[list]);
      if (vm.type == 'favoritos' || vm.type == 'pendientes') {
        vm.pelis = vm[list];
      }
      vm[list + 'Flag'] = false;
    }
    
    function getList(list) {
      vm.type = list;
      vm.pelis = [];
      vm.pelis = MemoryFactory.get(list);
    }
    
    function inList(item,list) {
      if (list in localStorage) {
        vm[list] = MemoryFactory.get(list);
      } else {
        vm[list] = [];
      }
      vm[list + 'Flag'] = false;
      vm[list].forEach(function (element) {
        if (element.id == item.id) {
          vm[list + 'Flag'] = true;
        };
      });
    }
    
//    Controller functions

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
