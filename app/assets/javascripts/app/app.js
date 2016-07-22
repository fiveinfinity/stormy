angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps'])
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
        libraries: 'weather, geometry, visualization, places'
    });
  });
