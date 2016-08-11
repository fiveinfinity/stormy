function WeatherService($http) {
    this.geoLookup = function(lat, lng, maps) {
        var city, state
            // USING CORS.IO TO CIRCUMVENT CORS. NEED TO SET UP A PROXY. HEADERS NOT WORKING WITH WUNDERGROUND.
            // return $http.get('http://cors.io/?u=http://api.wunderground.com/api/b924e5e377465063/geolookup/q/'+lat+','+lng+'.json').then(function(data) {
            //   city = data['data']['location']['city'];
            //   state = data['data']['location']['state'];
            //   console.log(city+', '+state);
            //   // return weatherPoint[i] = [city, state];
            // });
            // return [city, state];

        // GOOGLE MAPS REVERSE GEO LOOKUP
        // var geocoder = new maps.Geocoder();
        // var latlng = new maps.LatLng(lat, lng);
        // geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        //     console.log(results);
        // });
    }
}

angular
    .module('app')
    .service('WeatherService', WeatherService);
