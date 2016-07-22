function HomeController($scope, uiGmapGoogleMapApi, uiGmapIsReady) {
  var ctrl = this;
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, control: {} };
  uiGmapGoogleMapApi.then(function(maps) {
    ctrl.maps = maps;
  });

  ctrl.directions = function() {
    uiGmapIsReady.promise(1).then(function(instances) {
      ctrl.directionsDisplay = new ctrl.maps.DirectionsRenderer();
      ctrl.directionsService = new ctrl.maps.DirectionsService();
      ctrl.map = instances[0].map;
      ctrl.directionsDisplay.setMap(ctrl.map);
      ctrl.directionsAPI(ctrl.directionsService, ctrl.maps);
    });
  }

  ctrl.directionsAPI = function(directionsService, maps) {
    directionsService.route({
      origin: ctrl.origin,
      destination: ctrl.destination,
      travelMode: maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      drivingOptions: {
        departureTime: new Date('2016-07-29'),
        trafficModel: google.maps.TrafficModel.PESSIMISTIC
      }
    }, function(response, status) {
      if (status == maps.DirectionsStatus.OK) {
        ctrl.directionsDisplay.setDirections(response);
//      IN THE RESPONSE (THIS IS THE POLYLINE AND DATA THAT CREATE THE ROUTE), A 'ROUTES' PARAMETER IS STORED.
//      INSIDE OF THIS, IS THE OVERVIEW_PATH. THE LAT/LNG FROM EACH IS STORED, AND WE CAN PULL WEATHER EVERY 30 POINTS (OR HOWEVER MANY)
//      THE FOLLOWING CODE RETRIEVES THE LAT & LNG DEPENDING ON THE INDEX OF THE OVERVIEW PATH.
//         response['routes'][0]['overview_path']['INSERT INDEX HERE'].lat()
//         response['routes'][0]['overview_path']['INSERT INDEX HERE'].lng()

        // THE FOLLOWING CODE TAKES THE OVERVIEW PATH AND STORES LAT & LNG POINTS EVERY 30 KEYS IN THE OVERVIEW PATH
        // STORED IN THE weatherPoint OBJECT. CREATES NEW MARKERS ALONG ROUTE AND RENDERS MARKERS.
        // REFACTOR INTO A SERVICE
        ctrl.weatherPoint = {};
        routePoints = response['routes'][0]['overview_path'];
        i = 0;

        for(j = 30; j < routePoints.length; j+=30) {
          lat = routePoints[j].lat();
          lng = routePoints[j].lng();
          ctrl.weatherPoint[i] = [routePoints[j].lat(), routePoints[j].lng()];
          i++;

          new maps.Marker({
            position: {lat, lng},
            map: ctrl.map
          });
        }
      }
    });
  }
}

angular
  .module('app')
  .controller('HomeController', HomeController);
