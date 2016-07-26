/* createDirections function
*  this is returning the required object to create a directions route.
*  Trying to keep our controllers thin, better for testing.
*/


/*  createMarkers function
*   IN THE RESPONSE (THIS IS THE POLYLINE AND DATA THAT CREATE THE ROUTE), A 'ROUTES' PARAMETER IS STORED.
*   INSIDE OF THIS, IS THE OVERVIEW_PATH. THE LAT/LNG FROM EACH IS STORED, AND WE CAN PULL WEATHER EVERY 30 POINTS (OR HOWEVER MANY)
*
*   THE FOLLOWING CODE RETRIEVES THE LAT & LNG DEPENDING ON THE INDEX OF THE OVERVIEW PATH.
*   response['routes'][0]['overview_path']['INSERT INDEX HERE'].lat()
*   response['routes'][0]['overview_path']['INSERT INDEX HERE'].lng()
*
*   TEXT HERE GIVES YOU '53.5mi', VALUE IS DISTANCE IN METERS e.g. '86050'
*   response['routes'][0]['legs'][0]['distance']['text'] -OR- ['value']
*
*   SAME AS ABOVE, '57 mins' OR '3391' IN SECONDS
*   response['routes'][0]['legs'][0]['duration']['text'] -OR- ['value']
*
*   THE FOLLOWING CODE TAKES THE OVERVIEW PATH AND STORES LAT & LNG POINTS EVERY 30 KEYS IN THE OVERVIEW PATH
*   STORED IN THE weatherPoint OBJECT. CREATES NEW MARKERS ALONG ROUTE AND RENDERS MARKERS.
*/

function MapsService(TimeService) {
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

  this.createMarkers = function(response, maps, map) {
    weatherPoint = {};
    routePoints = response['routes'][0]['overview_path'];
    // 'i' is the weatherPoint variable index, incremented by 1, 'j' is the index for each overview_path we're persisting.
    i = 0;
    for(j = 30; j < routePoints.length; j+=30) {
      lat = routePoints[j].lat();
      lng = routePoints[j].lng();
      weatherPoint[i] = [routePoints[j].lat(), routePoints[j].lng()];
      i++;
      //creating new markers for each overview_path we're saving on the directionsDisplay variable.
      new maps.Marker({
        position: {lat, lng},
        map: map
      });
    }
  }

  this.setWaypointTimes = function() {

  }
}

angular
  .module('app')
  .service('MapsService', MapsService);
