(function() {
  'use strict';

  angular
    .module('MovieFinder')
    .controller('SingleController', SingleController);

  SingleController.$inject = ['$routeParams', 'TMDbFactory'];

  /* @ngInject */
  function SingleController($routeParams, TMDbFactory){
    var vm = this;
    vm.get = get;
    

    activate();

    ////////////////

    function activate() {
      get();
    }
    
    function get() {
      TMDbFactory.getDetails($routeParams.idSingle)
        .then(function(result) {
          vm.details = result;
        },
        function (error) {
        console.log('Ha habido un error al buscar los detalles');
        console.log(error);
      })
    }
  }
})();