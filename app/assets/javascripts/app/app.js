angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as home'
      });
    $urlRouterProvider.otherwise('/');
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDoHFpligHoNQ_2WZudFcGJqBVbWBWFqns',
        v: '3.exp',
        libraries: 'geometry, visualization, places'
    });
  });
