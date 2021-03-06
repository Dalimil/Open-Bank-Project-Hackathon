
var map;
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15
        });

    navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
        findRestaurants(position, map);
     });
    

 }

function findRestaurants(ourPosition, map){
	
    var text = '{ "results" : [{ "restaurant":"gbk" , "lat":"51.523600", "lng":"-0.086015"},' +
        '{ "restaurant":"gbk" , "lat":"51.523600", "lng":"-0.085215"},' +
        '{ "restaurant":"gbk" , "lat":"51.522600", "lng":"-0.085815"}]}';
    
    var obj = JSON.parse(text);
    
    var infowindow = new google.maps.InfoWindow;
    var restaurant;
    
    for (i = 0; i < obj.results.length; i++) {
      var pos = {lat: parseFloat(obj.results[i].lat), lng: parseFloat(obj.results[i].lng)};
      if(isClose(ourPosition, pos)){
            
        //should have an if statement to check if restaurant is close    
       
        var marker = new google.maps.Marker({
            map: map,
            position: pos
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                restaurant = obj.results[i].restaurant;
                infowindow.setContent(restaurant);
                infowindow.open(map, marker);
                sendPayment();
                
            }
         })(marker, i));
        
      }
    }
		

}




function isClose(ourPosition, position) {
    var ourLat = ourPosition.coords.latitude;
    var ourLng = ourPosition.coords.longitude;
    var lat = position.lat;
    var lng = position.lng;
    
    ourLat = deg2rad(ourLat);
    ourLng = deg2rad(ourLng);
    lat = deg2rad(lat);
    lng = deg2rad(lng);
    
    var x = (lng-ourLng) * Math.cos(lat - ourLat);
    var y = (lat-ourLat);
    var radius = 6371.0;
    var distance = Math.sqrt(x*x + y*y) * radius;

    var isClose = distance < 10.0;
    
    return isClose;
    
}


function deg2rad(degree){
    degree = parseFloat(degree);
    var rad = degree/180 * Math.PI;
    return rad;
}



 
// direct way 

 /*
// registering remote methods 
client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");
 
client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
*/
function sendPayment(){
     $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/sendPayment'
    });
     
    
}