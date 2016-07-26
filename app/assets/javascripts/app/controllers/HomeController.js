/* maps vs map vs $scope.map
*  maps is a generic Google Maps object that you can create Directions and Displays on (via uiGmapGoogleMapApi).
*  map is a returned promise of an actual map (via uiGmapIsReady).
*  $scope.map holds parameters regarding how you want your map to display on your page.
*/

function HomeController($scope, uiGmapGoogleMapApi, uiGmapIsReady, MapsService, week, TimeService) {
  var ctrl = this;
  ctrl.week = week;
  ctrl.hours = [1,2,3,4,5,6,7,8,9,10,11,12];
  ctrl.timePeriod = ['AM', 'PM']
  $scope.map = { center: { latitude: 37.09024, longitude: -95.712891 }, zoom: 4, control: {} };
  uiGmapGoogleMapApi.then(function(maps) {
    ctrl.maps = maps;
  });

  ctrl.directions = function() {
    uiGmapIsReady.promise(1).then(function(instances) {
      ctrl.directionsDisplay = new ctrl.maps.DirectionsRenderer();
      ctrl.directionsService = new ctrl.maps.DirectionsService();
      ctrl.map = instances[0].map;
      ctrl.directionsDisplay.setMap(ctrl.map);
      ctrl.createDirections(ctrl.directionsService, ctrl.maps);
    });
  }

  ctrl.createDirections = function(directionsService, maps) {
    hour = TimeService.militaryTime(ctrl.hour, ctrl.period);
    //need to return the day and match against ctrl.week object
    dayInt = TimeService.getDayInt(ctrl.day)
    date = TimeService.dateParser(ctrl.week[dayInt][1]);
    directionsService.route(MapsService.directionParams(ctrl.origin, ctrl.destination, maps, date, hour),
    function(response, status) {
      if (status == maps.DirectionsStatus.OK) {
        //sets directions, creates markers on the maps object via MapsService
        ctrl.directionsDisplay.setDirections(response);
        ctrl.weatherPoint = MapsService.createMarkers(response, maps, ctrl.map);
      }
    });
  }
}

angular
  .module('app')
  .controller('HomeController', HomeController);
