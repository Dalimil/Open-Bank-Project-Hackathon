/** Sample code using the 'request' module to make server-side http requests */
var request = require('request');

/* GET 
request('http://example.com', function(error, response, body) {
	// Callback function
	if (!error && response.statusCode == 200) {
		console.log(body); // Show the HTML
	}
});*/



function sendPayment(cb) {

	/* POST */
	var k = request.post({
			url: 'https://apisandbox.openbankproject.com/my/logins/direct',
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
				"Authorization": 'DirectLogin username="rory_fayed@hotmail.com", password="password", consumer_key="04uk4igt3fng0gwj20o3scqllena0voaskbyo4gh"'
			}
		},
		function(err, response, body) {
			cb(body);
		}
	);
	console.log(k);
}

exports.sendPayment = sendPayment;
