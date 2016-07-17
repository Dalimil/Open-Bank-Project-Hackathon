console.log("Welcome to your web JavaScript!");

// document ready
$(function(){
	// Init navbar
	$('.button-collapse').sideNav();
	$('.parallax').parallax();

	// The following code is really insecure and embarrassing - but we have little time
	$(".add-basket").click(function() {
		var price = parseFloat($(this).parent().parent().find(".price").html().substring(1));
		console.log(price);
		$("#tot-price").html((parseFloat($("#tot-price").html()) + price).toFixed(2));
	});

	console.log(showToast);
	if(typeof showToast !== "undefined" && showToast) {
		console.log("ok");
		Materialize.toast('Submitted. You will receive your order soon...', 100000);
	}
});




