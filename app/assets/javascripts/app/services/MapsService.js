function MapsService(TimeService, WeatherService) {
    var currentMarkers = [];
    //creates the route object for Google Maps API.
    this.directionParams = function(origin, destination, maps, date, hour) {
        return {
            origin: origin,
            destination: destination,
            travelMode: maps.TravelMode.DRIVING,
            optimizeWaypoints: true,
            drivingOptions: {
                departureTime: new Date(date + ' ' + hour + ':00:00'),
                trafficModel: maps.TrafficModel.PESSIMISTIC
            }
        }
    }

    function newMarker(lat, lng, map, maps) {
        var newMarker = new maps.Marker({
            position: { lat, lng },
            map: map
        });
        currentMarkers.push(newMarker);
        return newMarker;
    }

    this.getMarkers = function() {
        return currentMarkers;
    }

    this.clearMarkers = function() {
        currentMarkers = [];
    }

    //creates markers based on overview_path waypoints in the Google Maps Directions response.
    this.createMarkers = function(response, maps, map) {
        markers = {};
        routePoints = response['routes'][0]['overview_path'];

        var i = 0;
        for (j = 30; j < routePoints.length; j += 30) {
            var lat = routePoints[j].lat();
            var lng = routePoints[j].lng();

            var geo = WeatherService.geoLookup(lat, lng, maps);
            var marker = newMarker(lat, lng, map, maps);
            markers[i] = [lat, lng, marker, geo];
            i++;
        }
        return markers;
    }

}

angular
    .module('app')
    .service('MapsService', MapsService);
