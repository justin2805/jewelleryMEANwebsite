var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');


var mongoose = require('mongoose'),
  User = require('./api/models/usersModel'),
  AboutUs = require('./api/models/aboutUsModel'),
  Products = require('./api/models/productsModel');

var port = process.env.port || 3001;
var app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/saireni', {
    useMongoClient: true
}); 

//set the view engine and tell it that we are using ejs
app.set('view engine', 'ejs');
// to render files with html extension
app.engine('html', require('ejs').renderFile);

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


// route
var userRoutes = require('./api/routes/userRoutes');
var aboutUsRoutes = require('./api/routes/aboutusRoutes');
var productsRoutes = require('./api/routes/productsRoutes');
userRoutes(app);
aboutUsRoutes(app);
productsRoutes(app);


app.listen(port, function () {
        console.log('S. Aireni - Server started on port: ' + port);
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});