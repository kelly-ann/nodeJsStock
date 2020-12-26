// Stock Market Portfolio App By K-A

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

// this line says that when you spin up the none web server you should listen on 
// whatever the environment's default port is set to OR if you cannot then listen on port 5000 instead.
const PORT = process.env.PORT || 5000;

// create callApi function
function callApi(finishedApi) {
	request('https://cloud.iexapis.com/stable/stock/rds.b/quote?token=pk_a6555f075d9d46bfa4582fd0d023e1a9',
		{ json: true }, 
		(err, res, body) => {
			console.log(" **** NEW RUN **** ");
			if (err) { 
				return console.log(err); 
			}
			if (res.statusCode == 200) { 
				//console.log(body); 
				finishedApi(body);
			}
		}
	);
}


// set Handlebars middleware
app.engine('handlebars', exphbs()); 		//use the engine to Handlebars which is an instance of exphbs
app.set('view engine', 'handlebars');		//set view engine to Handlebars

const otherStuff = "Hi there, this is other stuff!";

// set Handlebars routes
app.get('/', function (req, res) {
	callApi(function(doneWithApi) {
		res.render('home', {
	    	stock: doneWithApi
	    });	
	});
    
});

// create about.html page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// set static folder
// this is how you create a "route" in using Express JS for static (NOT dynamic) files.
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('**** Server listening on port: ' + PORT));
