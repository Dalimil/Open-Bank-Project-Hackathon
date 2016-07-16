console.log("first? " + isFirstVisit);

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();

	if(isFirstVisit) {
		$('.slider').slider({ full_width: true });
		$('#finish-intro').click(function() {
			$('.slider').slideUp();
		});
	}

});


