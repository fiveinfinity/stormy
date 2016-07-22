function HomeController($scope, uiGmapGoogleMapApi, uiGmapIsReady) {
  var ctrl = this;
 $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, control: {} };

  uiGmapGoogleMapApi.then(function(maps) {
    ctrl.directionsDisplay = new maps.DirectionsRenderer();
    ctrl.maps = maps;
  });

  ctrl.directions = function() {
    uiGmapIsReady.promise(1).then(function(instances) {
      ctrl.directionsService = new ctrl.maps.DirectionsService();
      ctrl.directionsDisplay.setMap(instances[0].map);
      ctrl.directionsAPI(ctrl.directionsService, ctrl.maps);
    });
  }

  ctrl.directionsAPI = function(directionsService, maps) {
    directionsService.route({
      origin: ctrl.origin,
      destination: ctrl.destination,
      travelMode: maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status == maps.DirectionsStatus.OK) {
        console.log('here')
        ctrl.directionsDisplay.setDirections(response);
      }
    });
  }
}

angular
  .module('app')
  .controller('HomeController', HomeController);
