console.log("first? " + isFirstVisit);

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();

	if(isFirstVisit) {
		$('#restaurant-list').hide();
		$('.slider').slider({ full_width: true });
		$('#finish-intro').click(function() {
			$('.slider').slideUp();
			$('#restaurant-list').show();
		});
	}

});


