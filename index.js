var express = require('express'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  jsonWebToken = require('jsonwebtoken');

var User = require('./api/models/usersModel'),
  AboutUs = require('./api/models/aboutUsModel'),
  Products = require('./api/models/productsModel');

var port = process.env.PORT || 3000;
var app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/saireni', {
  useMongoClient: true
});


app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'SagarAirenisSecretKey',
      function (err, decode) {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      });
  } else {
    req.user = undefined;
    next();
  }
});

// logger logs in dev environment
app.use(morgan('dev'));

//set the view engine and tell it that we are using ejs
app.set('view engine', 'ejs');
// to render files with html extension
app.engine('html', require('ejs').renderFile);

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if not done, might trigger CORS-Cross Origin Request Sharing error in the browser
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

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

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});