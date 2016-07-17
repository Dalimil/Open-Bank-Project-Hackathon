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
            var token = JSON.parse(body)["token"];
            // send payment here
            var bodyObject = {  "to":{    "bank_id":"rbs",    "account_id":"224488"  },  "value":{    "currency":"EUR",    "amount":"100.53"  },  "description":"A description for the transaction to be created"};
			request.post({
         url:"https://apisandbox.openbankproject.com/obp/v2.0.0/banks/rbs/accounts/224466/owner/transaction-request-types/SANDBOX_TAN/transaction-requests",
                timeout: 10000,
                json: true,
                
                headers: {
                    "Content-Type": "application/json",
				    "Authorization": 'DirectLogin token="'+token+'"'
                },
                 body: bodyObject
            
                
            }, function(err, res, body) {
                console.log(body);
                cb(body);
                
            });
		});
	console.log(k);
}

exports.sendPayment = sendPayment;


