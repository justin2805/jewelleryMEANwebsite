var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var assert = require("assert");

var port = 3000;
var app = express();

//set the view engine and tell it that we are using ejs
app.set('view engine', 'ejs');
// to render files with html extension
app.engine('html',require('ejs').renderFile);

// body parser middleware
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));


app.listen(port, function(){
    console.log('S. Aireni - Server started on port: '+port);
});