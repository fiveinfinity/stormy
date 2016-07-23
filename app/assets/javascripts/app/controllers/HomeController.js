/* maps vs map vs $scope.map
*  maps is a generic Google Maps object that you can create Directions and Displays on (via uiGmapGoogleMapApi).
*  map is a returned promise of an actual map (via uiGmapIsReady).
*  $scope.map holds parameters regarding how you want your map to display on your page.
*/


function HomeController($scope, uiGmapGoogleMapApi, uiGmapIsReady, MapsService) {
  var ctrl = this;
  //sets $scope map parameters and creates an instance of Google Maps (you use this to instantiate services).
  $scope.map = { center: { latitude: 37, longitude: -122 }, zoom: 8, control: {} };
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
    directionsService.route(MapsService.directionParams(ctrl.origin, ctrl.destination, maps),
    function(response, status) {
      if (status == maps.DirectionsStatus.OK) {
        //sets directions, creates markers on the maps object via MapsService
        ctrl.directionsDisplay.setDirections(response);
        ctrl.weatherPoint = MapsService.createMarkers(response, maps, ctrl.map)
      }
    });
  }
}

angular
  .module('app')
  .controller('HomeController', HomeController);
