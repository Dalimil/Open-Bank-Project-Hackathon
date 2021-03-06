"use strict"

const express = require('express');
const bodyParser = require('body-parser'); // additional body parsing
const morgan = require('morgan'); // General request logger
const Cookies = require('cookies');
const path = require('path'); // path.join
const pp = function(s){ return path.join(__dirname, s); };
const app = express();
const server = require('http').createServer(app); // or https
const config = require('./config');
const bankapi = require('./controllers/OpenBankApi');

app.set('port', (process.env.PORT || 8080));

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.use(morgan('dev')); // Set up logger

// Expose urls like /static/images/logo.png 
app.use('/static', express.static(pp('public'))); // first arg could be omitted

// Index
app.get('/', function(req, res) {
	let cookies = new Cookies(req, res);
	let isFirstVisit = cookies.get("firstVisit") == undefined ? true : false;
	cookies.set("firstVisit", "false");

	console.log(isFirstVisit);
	// console.log(req.session);
	// delete req.session.shop;
	// res.json({ user: 'john' }); // Send json response
	// res.sendFile( __dirname + "/" + "index.html" );
	// Now render .pug template with any JSON locals/variables:
	res.render('index', { isFirstVisit: isFirstVisit } );  // TODO: remove negation
});

app.get('/order-complete', function(req, res) {
	let cookies = new Cookies(req, res);
	let orderid = cookies.get("order-id");
	console.log("OrderID", orderid);
	res.render('order-complete', {url: "/static/img/rest.jpg", orderid: orderid });
});

// This would be POST but I'm too tired to do the whole client-submit-form flow
app.get('/submitted', function(req, res) {
	let cookies = new Cookies(req, res);
	let restaurant = cookies.get("restaurant");
	let oid = Math.round(Math.random()*10000);
	if(oid < 1000) oid += 1000;
	
	cookies.set("order-id", oid.toString());
	// res.redirect('/restaurant/' + restaurant + '/?ordered=true');
	res.redirect('/order-complete');
});

app.get('/restaurant/:name', function(req, res) {
	let name = req.params.name;
	let cookies = new Cookies(req, res);
	cookies.set("restaurant", name);

	let submitted = req.query.ordered;
	let showToast = false;
	let toastData = false;
	// console.log(submitted !== undefined);
	if(submitted !== undefined && submitted) {
		showToast = true;
		bankapi.sendPayment(function(data) {
			console.log("");
			console.log("Open bank project id: " + data['id']);
			toastData = data["transaction_ids"];
			console.log("Transaction id: "+ toastData);
			console.log("");
			res.render('restaurant', {url: "/static/img/rest.jpg", showToast: showToast, toastData: toastData});
		});
	} else {

		console.log(showToast);
		res.render('restaurant', {url: "/static/img/rest.jpg", showToast: showToast, toastData: toastData});
	}
});

app.get('/menu', function(req, res) {
	let cookies = new Cookies(req, res);
	let restaurant = cookies.get("restaurant");
	/*if(restaurant === undefined) {
		res.send("You didn't select a restaurant!");
	}*/
	res.render('menu', {url: "/static/img/rest.jpg", showToast: false, toastData: false,
		menu: { "classics": [["Beef", 5.35, "House mayo, relish, salad"], 
		["Chicken", 6.75, "Choose from chargrilled or panko crumbed and fried"], 
		["Cheese", 6.55, "Beef, house mayo, relish, salad"], 
		["Veggie", 5.55, "Housemade and pan-fried bean patty, house mayo, relish, salad"]], 
		"salads": [["Chilli Chicken", 9.55, "Warm marinated chargrilled chicke, cucumber, cherry tomatoes."], 
		["Chorizo Avo Salad", 8.95, "Chorizo, mixed grains, avocado, smoked semi-dried tomatoes, pomegranate seeds"],
		["GBK Salad", 7.15, "Sliced avocado, semi-dried and cherry tomatoes, mixed leaves"]], 
		"extras": [["Avocado", 1.65, "Try this."], ["Cheese", 1.65, "Best cheese in the galaxy."], 
		["Onion Ring", 0.95, "The best ring ever."]], 
		"drinks": [["High Wire", 4.95, "Mango, lychee and lip-smacking grapefruit"], 
		["Mont Blanc", 4.85, "Rich, full-bodied with balanced bitterness."],
		 ["San Miguel", 3.85, "Golden, pilsner style lager"]], 
		 "desserts": [["Greek Yoghurt and Honey Ice-cream", 2.50, "Greek style creamy yogurt."], 
		 ["Frozen Strawberry Yogurt", 2.50, "Love strawberries? Try this yogurt."], 
		 ["Madagascan Vanilla Ice-cream", 2.30, "Best Ice-cream you can get"]] } });
});

app.get('/book', function(req, res) {
	let cookies = new Cookies(req, res);
	let restaurant = cookies.get("restaurant");
	if(restaurant === undefined) {
		res.send("You didn't select a restaurant!");
	}
	res.send("ok");
});

app.get("/account", function(req, res) {
	res.render("account");
});


server.listen(process.env.PORT || config.PORT, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.log(app.get('env'));
	console.log("Server dir: " + pp('/'));
	console.log((new Date()).toLocaleTimeString() + " - Server running at http://localhost:" + port);  
});

app.get('/sendPayment', function(req, res) {
	bankapi.sendPayment(function(data) {
		res.send(data);
	});
});
