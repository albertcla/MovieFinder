(function () {
  'use strict';
  angular
    .module('MovieFinder')
    .factory('TMDbFactory', TMDbFactory);

  TMDbFactory.$inject = ['$http'];

  /* @ngInject */
  function  TMDbFactory($http){
    var exports = {
      getPack: getPack
    };
    
//    var type = '/discover';
//    var format = '/movie';
//    var adult = '&include_adult=true';
    return exports;

    ////////////////

    function getPack() {
      
      var urlAPI = 'https://api.themoviedb.org/3';
      var typeSearch = '/discover';
      var format = '/movie';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var lang = '&language=en-US';
      var sort = '&sort_by=popularity.desc';
      var includeAdult = '&include_adult=true';
      var includeVideo = '&include_video=false';
      var page = '&page=' + 1;
      var DateStart = '&primary_release_date.gte=1990';
      var DateEnd = '&primary_release_date.lte=2000';
      var voteStart = '&vote_average.gte=1';
      var voteEnd = '&vote_average.lte=4';
      var genere = '&with_genres=comedy';
      
      var urlGetPack = urlAPI + typeSearch + format + KeyAPI;
      
//      var urlGetPack = urlAPI + typeSearch + format + KeyAPI + lang + sort + includeAdult + includeVideo + page + DateStart + DateEnd + voteStart + voteEnd + genere; 
      
      return $http.get(urlGetPack)
        .then(function (response) {
            var result = [];
            response.data.results.forEach(function (item, index) {
              var cover = '';
              if (item.poster_path == null) {
                cover = 'http://placehold.it/269x403';
              } else {
                cover = 'https://image.tmdb.org/t/p' + '/w342/' + item.poster_path;
              }
              result.push({
                coverPath: cover,
                id: item.id
              });
            });
            return result;
          },
          function (error) {
            console.log('Ha habido un error al buscar las pelis');
            console.log(error);
          })
    }
  }
})();