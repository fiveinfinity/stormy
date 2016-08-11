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
        var markers = {};
        //meters
        var distanceInMeters = response['routes'][0]['legs'][0]['distance']['value'];
        var distanceInMiles = toMiles(distanceInMeters);
        var routePoints = response['routes'][0]['overview_path'];
        //set routePoint cadence
        var cadence = getCadence(distanceInMiles);

        var i = 0;
        for (j = cadence; j < routePoints.length; j += cadence) {
            var lat = routePoints[j].lat();
            var lng = routePoints[j].lng();

            // var geo = WeatherService.geoLookup(lat, lng, maps);
            var marker = newMarker(lat, lng, map, maps);
            //add 'geo' to the array below when app is ready.
            markers[i] = [lat, lng, marker];
            i++;
        }
        //the next lines to the return are for testing to keep API calls to a min, use the commented line for app.
        var geo = WeatherService.geoLookup(markers[0][0], markers[0][1], maps);
        geo.then(function(data) {
            var city = data['data']['location']['city'];
            var state = data['data']['location']['state'];
            markers[0].push(city);
            markers[0].push(state);
        });
        return markers;
    }

    function toMiles(meters) {
        return Math.floor(meters/1609);
    }

    function getCadence(miles) {
        console.log(miles);
        if(miles < 100) {
            return 90;
        } else if(miles > 100 && miles < 500) {
            return 60;
        } else {
            return 30;
        }
    }

}

angular
    .module('app')
    .service('MapsService', MapsService);
