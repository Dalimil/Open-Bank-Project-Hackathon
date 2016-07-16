
var map;
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });

    
/*
    navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
        alert(position.coords.latitude);
       // findRestuarants(position, map);
     });
   */ 

 
}
/*
function findRestuarants(position, map){

	var resLat = position.coords.latitude;
	var resLng = position.coords.latitude;
	
    var obj = JSON.parse("test.json");
    
    for (i = 0; i < obj.results.length; i++) {
        
    }
    //find restaurants in the area
	jsonFindRestaurants(results);
		
	
}




function jsonFindRestaurants(json) {
    var obj = parse.JSON(json);
    var infowindow = new google.maps.InfoWindow;
        
  for (i = 0; i < obj.results.length; i++) {
    var restaurant = obj.results[i].restaurant;

    var pos = {lat: parseFloat(obj.results[i].lat), lng: parseFloat(obj.results[i].lng)};

    var marker = new google.maps.Marker({
        map: map,
        position: pos,

    });

     google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            contentString = restuarant;

            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        }
      })(marker, i));
    }
  
}
*/
