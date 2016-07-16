console.log("Welcome to your web application's JavaScript!");

// document ready
$(function(){
	// Init navbar
	$('.modal-trigger').leanModal();
	$('.slider').slider({full_width: false});
	Materialize.toast('I am a toast!', 3000);
   
});




