var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var assert = require("assert");
var path = require('path');

var aboutus = require('./routes/aboutus');
var home = require('./routes/home');
// var products = require('./routes/products');

var port = 3000;
var app = express();

//set the view engine and tell it that we are using ejs
app.set('view engine', 'ejs');
// to render files with html extension
app.engine('html',require('ejs').renderFile);

// body parser middleware
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));


// route
app.use('/',aboutus);
app.use('/',home);
// app.use('/',products);


app.listen(port, function(){
    console.log('S. Aireni - Server started on port: '+port);
});