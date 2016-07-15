const express = require('express');
const bodyParser = require('body-parser'); // additional body parsing
const morgan = require('morgan'); // General request logger
const session = require('express-session'); // session cookies
const path = require('path'); // path.join
const pp = function(s){ return path.join(__dirname, s); };
const app = express();
const server = require('http').createServer(app); // or https
const config = require('./config');

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.use(morgan('dev')); // Set up logger
const debug = require('./utils/debug'); // + my own logger
app.use(debug.requestInfo); // Middleware function - Order/Place of call important!

// Set up secure cookie session - MemoryOnly - Session disappears on reload
app.use(session({
	secret: config.APP_SECRET,
	saveUninitialized: false,
	resave: false // keep the most recent session modification
}));

// Expose urls like /static/images/logo.png 
app.use('/static', express.static(pp('public'))); // first arg could be omitted

// Index
app.get('/', function(req, res) {
	req.session.shop = { items: [1,2,3] }; // set cookie - any json or string
	req.session.views += 1;
	console.log(req.session);
	// delete req.session.shop;
	// res.json({ user: 'john' }); // Send json response
	// res.sendFile( __dirname + "/" + "index.html" );
	// Now render .pug template with any JSON locals/variables:
	res.render('index', 
		{ title: 'Demo', data: { name: "Shop", items: [3, 5, 8] } } 
	); 
});

// Our central site - with user registration, etc.
app.get('/central', function(req, res) {
	res.render('central');
});


app.get('/restaurant/:name', function(req, res) {
   console.log(req.requestInfo);
   res.send('Hello <strong>GET</strong>');
});


// Debug
app.route('/debug') 
	.get(function(req, res) {
		var info = req.requestInfo;
		res.jsonPretty(info); // custom method
	})
	.post(function(req, res) {
		// Or with status: res.status(500).json({ error: 'message' });
		res.json(req.requestInfo);
	});


server.listen(config.PORT, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.log(app.get('env'));
	console.log("Server dir: " + pp('/'));
	console.log((new Date()).toLocaleTimeString() + " - Server running at http://localhost:" + port);
});