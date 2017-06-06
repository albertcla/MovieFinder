(function () {
  'use strict';
  angular
    .module('MovieFinder')
    .factory('MemoryFactory', MemoryFactory);

//  MemoryFactory.$inject = [''];

  /* @ngInject */
  function MemoryFactory() {
    var exports = {
      save: save,
      get: get
    };

    
    return exports;

    ////////////////

    function save(name, list) {
      localStorage.setItem(name, JSON.stringify(list))
    }
    
    function get(list) {
      if (list in localStorage) {
        return JSON.parse(localStorage.getItem(list));
      } else {
        console.log(list + ' vacío');
      }
    }
  }
})();
