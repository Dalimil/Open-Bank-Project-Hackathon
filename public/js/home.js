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
		
		$('.slides').height($('body').height() - $("nav").height());
		console.log($(".slides").height());
		$('ul.indicators').css('z-index', 3);
		$('.slider').height($('body').height() - $("nav").height() - 20);
		$(".slider").show();
		console.log($(".slides").height());

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

