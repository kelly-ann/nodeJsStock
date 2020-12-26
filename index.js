// Stock Market Portfolio App By K-A

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


// this line says that when you spin up the none web server you should listen on 
// whatever the environment's default port is set to OR if you cannot then listen on port 5000 instead.
const PORT = process.env.PORT || 5000;

// set Handlebars middleware
app.engine('handlebars', exphbs()); 		//use the engine to Handlebars which is an instance of exphbs
app.set('view engine', 'handlebars');		//set view engine to Handlebars

const otherStuff = "Hi there, this is other stuff!";

// set Handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: otherStuff
    });
});

// set static folder
// this is how you create a "route" in using Express JS for static (NOT dynamic) files.
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('**** Server listening on port: ' + PORT));
