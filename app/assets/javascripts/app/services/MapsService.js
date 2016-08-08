function MapsService(TimeService, WeatherService) {
  //creates the route object for Google Maps API.
  this.directionParams = function(origin, destination, maps, date, hour) {
    return {
      origin: origin,
      destination: destination,
      travelMode: maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      drivingOptions: {
        departureTime: new Date(date+' '+hour+':00:00'),
        trafficModel: maps.TrafficModel.PESSIMISTIC
      }
    }
  }

  //creates markers based on overview_path waypoints in the Google Maps Directions response.
  this.createMarkers = function(response, maps, map) {
    weatherPoint = {};
    routePoints = response['routes'][0]['overview_path'];

    var i = 0;
    for(j = 30; j < routePoints.length; j+=30) {
      lat = routePoints[j].lat();
      lng = routePoints[j].lng();
      //WeatherService to get city at coords.
      var geo = WeatherService.geoLookup(lat, lng, maps);
      weatherPoint[i] = [routePoints[j].lat(), routePoints[j].lng()];
      // weatherPoint[i] = [location[0], location[1]];
      i++;

      new maps.Marker({
        position: {lat, lng},
        map: map
      });
    }
    console.log(weatherPoint)
    return weatherPoint;
  }
}

angular
  .module('app')
  .service('MapsService', MapsService);
