(function () {
  'use strict';
  angular
    .module('MovieFinder')
    .factory('TMDbFactory', TMDbFactory);

  TMDbFactory.$inject = ['$http'];

  /* @ngInject */
  function  TMDbFactory($http){
    var exports = {
      getPack: getPack,
      getMovie: getMovie
    };
    
//    var type = '/discover';
//    var format = '/movie';
//    var adult = '&include_adult=true';
    return exports;

    ////////////////

    function getPack(dateMax,valMax,adult,genres) {
      
      var urlAPI = 'https://api.themoviedb.org/3';
      var typeSearch = '/discover';
      var format = '/movie';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var lang = '&language=en-US';
      var sort = '&sort_by=popularity.desc';
      var includeAdult = '&include_adult=' + adult;
      var includeVideo = '&include_video=false';
      var page = '&page=' + 1;
      var DateStart = '&primary_release_date.gte=1900';
      var DateEnd = '&primary_release_date.lte=' + dateMax;
      var voteStart = '&vote_average.gte=1';
      var voteEnd = '&vote_average.lte=' + valMax;
      if (genres == undefined) {
        var genre = '';
      } else {
        genres = genres.toString().replace(',','%2C');
        var genre = '&with_genres=' + genres;
      }
      
      var urlGetPack = urlAPI + typeSearch + format + KeyAPI + includeAdult + DateEnd + voteEnd + genre;
      
//      var urlGetPack = urlAPI + typeSearch + format + KeyAPI + lang + sort + includeAdult + includeVideo + page + DateStart + DateEnd + voteStart + voteEnd + genere; 
      
      return $http.get(urlGetPack)
        .then(function (response) {
            var result = {
              total: {
                results: response.data.total_results,
                pages: response.data.total_pages
              },
              pelis: []
            };
            response.data.results.forEach(function (item, index) {
              var cover = '';
              if (item.poster_path == null) {
                cover = 'http://placehold.it/269x403';
              } else {
                cover = 'https://image.tmdb.org/t/p' + '/w342/' + item.poster_path;
              }
              result.pelis.push({
                coverPath: cover,
                id: item.id,
                voteAvg: item.vote_average,
                voteCnt: item.vote_count
              });
            });
            return result;
          },
          function (error) {
            console.log('Ha habido un error al buscar las pelis');
            console.log(error);
          })
    }
    
    function getMovie(query, adult) {
      var urlAPI = 'https://api.themoviedb.org/3';
      var typeSearch = '/search';
      var format = '/movie';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var lang = '&language=en-US';
      var q = '&query=' + query;
      var page = '&page=1';
      var includeAdult = '&include_adult=' + adult;
      
      var urlsearch = urlAPI + typeSearch + format + KeyAPI + lang + q + page + includeAdult;
      
      return $http.get(urlsearch)
        .then(function (response) {
            var result = {
              total: {
                results: response.data.total_results,
                pages: response.data.total_pages
              },
              pelis: []
            };
            response.data.results.forEach(function (item, index) {
              var cover = '';
              if (item.poster_path == null) {
                cover = 'http://placehold.it/269x403';
              } else {
                cover = 'https://image.tmdb.org/t/p' + '/w342/' + item.poster_path;
              }
              result.pelis.push({
                coverPath: cover,
                id: item.id,
                voteAvg: item.vote_average,
                voteCnt: item.vote_count
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