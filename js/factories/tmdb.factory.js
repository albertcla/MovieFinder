(function () {
  'use strict';
  angular
    .module('MovieFinder')
    .factory('TMDbFactory', TMDbFactory);

  TMDbFactory.$inject = ['$http'];

  /* @ngInject */
  function TMDbFactory($http) {
    var exports = {
      getPack: getPack,
      getLatest: getLatest,
      getUpcoming: getUpcoming,
      getMovies: getMovies,
      getDetails: getDetails,
      httpError: httpError
    };

    //    var type = '/discover';
    //    var format = '/movie';
    //    var adult = '&include_adult=true';
    return exports;

    ////////////////

    function getPack(dateMax, valMax, adult, genres, page) {

      var urlAPI = 'https://api.themoviedb.org/3';
      var typeSearch = '/discover';
      var format = '/movie';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      //    var lang = '&language=en-US';
      //    var sort = '&sort_by=popularity.desc';
      var includeAdult = '&include_adult=' + adult;
      //    var includeVideo = '&include_video=false';
      var page = '&page=' + page;
      //    var DateStart = '&primary_release_date.gte=1900';
      var DateEnd = '&primary_release_date.lte=' + dateMax;
      //    var voteStart = '&vote_average.gte=1';
      var voteEnd = '&vote_average.lte=' + valMax;
      if (genres == undefined) {
        var genre = '';
      } else {
        genres = genres.toString().replace(',', '%2C');
        var genre = '&with_genres=' + genres;
      }
      var urlGetPack = urlAPI + typeSearch + format + KeyAPI + includeAdult + page + DateEnd + voteEnd + genre;
      return $http.get(urlGetPack)
        .then(packResults, httpError)
    }

    function getUpcoming(page) {
      var urlAPI = 'https://api.themoviedb.org/3';
      var format = '/movie';
      var typeSearch = '/upcoming';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var page = '&page=' + page;
      var urlUpcoming = urlAPI + format + typeSearch + KeyAPI + page;
      return $http.get(urlUpcoming)
        .then(packResults, httpError)
    }

    function getLatest(page) {
      var urlAPI = 'https://api.themoviedb.org/3';
      var format = '/movie';
      var typeSearch = '/now_playing';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var page = '&page=' + page;
//    https://api.themoviedb.org/3/movie/now_playing?api_key=fcd3e5faa403e363c9efd02c164b0679&page=1
      var urlLatest = urlAPI + format + typeSearch + KeyAPI + page;

      return $http.get(urlLatest)
        .then(packResults, httpError)
    }

    function getMovies(query, adult, page) {
      var urlAPI = 'https://api.themoviedb.org/3';
      var typeSearch = '/search';
      var format = '/movie';
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var lang = '&language=en-US';
      var q = '&query=' + query;
      var page = '&page=' + page;
      var includeAdult = '&include_adult=' + adult;

      var urlsearch = urlAPI + typeSearch + format + KeyAPI + lang + q + page + includeAdult;

      return $http.get(urlsearch)
        .then(packResults, httpError)
    }
    
    function getDetails(id) {
      var urlAPI = 'https://api.themoviedb.org/3';
      var format = '/movie/';
      var movieId = id;
      var KeyAPI = '?api_key=fcd3e5faa403e363c9efd02c164b0679';
      var urldetails = urlAPI + format + movieId + KeyAPI;
      return $http.get(urldetails)
        .then(detailResults, httpError)
    }
    
    function packResults(response) {
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
    }
    
    function detailResults(response) {
      var cover = '';
      if (response.data.poster_path == null) {
        cover = 'http://placehold.it/269x403';
      } else {
        cover = 'https://image.tmdb.org/t/p' + '/w342/' + response.data.poster_path;
      }
      var date = response.data.release_date.slice(0, 4);
      var duration = Math.floor(response.data.runtime / 60) + 'h' + (response.data.runtime - Math.floor(response.data.runtime / 60) * 60) + 'm';
      var result = {
        id: response.data.id,
        cover: cover,
        title: response.data.original_title,
        abstract: response.data.overview,
        genre: response.data.genres,
        date: date,
        duration: duration,
        voteAvg: response.data.vote_average,
        voteCnt: response.data.vote_count
      }
      return result;
    }
    
    function httpError(error) {
      console.log('Ha habido un error al hacer la petición');
      console.log(error);
    }
  }
})();
