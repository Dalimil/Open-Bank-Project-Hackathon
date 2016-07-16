console.log("first? " + isFirstVisit);

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();
	stretchMap();
	
	if(isFirstVisit) {
		$("#map").css("visibility", "hidden");
		$('#restaurant-list').hide();
		
		$('.slider').slider({ full_width: true });
		$(".slider").show();

		$('#finish-intro').click(function() {
			$('.slider').slideUp();
			$('#restaurant-list').show();
			$('#map').css("visibility", "visible");
		});
	}

});

function stretchMap() { 
	$('#map').width($("body").width());
	$('#map').height($('#restaurant-list').offset().top - $("nav").height());
}

