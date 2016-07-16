console.log("Welcome to your web application's JavaScript!");

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();
	$('.modal-trigger').leanModal();
	$('.slider').slider({full_width: false});
	Materialize.toast('I am a toast!', 3000);
    initMap();
});



function initMap() {
    alert();
var div = document.createElement("div");
div.id= "map";
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}

