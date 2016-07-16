console.log("Welcome to your web application's JavaScript!");

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();

	if(isFirstVisit) {
		$('.slider').slider({ full_width: true });
		$('#finish-intro').click(function() {
			$('.slider').fadeOut();
		});
	}

	$('.modal-trigger').leanModal({
		dismissible: false, // Modal can be dismissed by clicking outside of the modal
		opacity: 0, // Opacity of modal background
		in_duration: 0, // Transition in duration
		out_duration: 0 // Transition out duration
		//ready: function() { alert('Ready'); }, // Callback for Modal open
		//complete: function() { alert('Closed'); } // Callback for Modal close
	});
	$('.modal-trigger').click();

});


