angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'ui.bootstrap'])
  .config(function($stateProvider, $httpProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as home',
        resolve: {
          week: function(TimeService) {
            return TimeService.nextSevenDays();
          }
        }
      });
    $urlRouterProvider.otherwise('/');
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDoHFpligHoNQ_2WZudFcGJqBVbWBWFqns',
        v: '3.exp',
        libraries: 'geometry, visualization, places'
    });
  });
