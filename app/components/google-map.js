import Ember from 'ember';

export default Ember.Component.extend({
  drectionDisplay:null,
  directionsService: new google.maps.DirectionsService(),
  map: null,
  init () {
    this._super(...arguments);
    this.send('initFunc');
  },
  actions: {
    initFunc () {
		  var directionsDisplay = new google.maps.DirectionsRenderer({
		    suppressMarkers: true
		  });
		  this.set('drectionDisplay', directionsDisplay);
		  var myOptions = {
		    zoom: 3,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		  }
		  var self = this;
		  setTimeout(function(){ 
		 	  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		 	  self.set('map', map);
		 	  self.send('calcRoute', map);
		    
		  }); 
		},
  	addressSubmit () {
        this.send('initFunc');
  	},

  	latlogconveter (addr) {
        var geocoder =  new google.maps.Geocoder();
        self = this;
        geocoder.geocode( { 'address': addr}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          	var temp = {address:addr , lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()};
            self.get('address').push(temp);
            var a =self.get('address');
            var map = self.get('map');
          } else {
            alert("Something got wrong " + status);
          }
        });
  	},
    calcRoute(map) {
		  var waypts = [];
		  if(this.get('intermediatePoint')){
		  	 var stop = this.get('intermediatePoint');
		  }else {
		  	var stop = this.get('start');
		  }
		  if(this.get('destination')){
		  	var end = this.get('destination');
		  }else {
		  	var end = this.get('start');
		  }
		 	    
		  this.send('createMarker', stop);
		  waypts.push({
		    location: stop,
		    stopover: true
		  });
		  var directionsDisplay = new google.maps.DirectionsRenderer({
	      suppressMarkers: true
	    });
		  directionsDisplay.setMap(map);
		  var start =  this.get('start');
		  
		  		    //28.506783, 77.174892
		  this.send('createMarker', start);
		  this.send('createMarker', end);
		  var request = {
	      origin: start,
	      destination: end,
	      waypoints: waypts,		      
	      optimizeWaypoints: true,
	      travelMode: google.maps.DirectionsTravelMode.DRIVING
		  };
	    this.get('directionsService').route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var route = response.routes[0];
        }
	    });		    
		},
		createMarker(latlng) { 
			var geocoder = new google.maps.Geocoder();
			var self = this;
	    geocoder.geocode( { 'address': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: self.get('map'),
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
		}
  }
});
