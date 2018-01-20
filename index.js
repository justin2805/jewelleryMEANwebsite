var express = require('express'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  jsonWebToken = require('jsonwebtoken'),
  cloudinary = require('cloudinary'),
  dotenv = require('dotenv').load();

var User = require('./api/models/usersModel'),
  ContactUs = require('./api/models/contactUsModel'),
  Products = require('./api/models/productsModel'),
  ReqStock = require('./api/models/reqStockModel'),
  cors = require('cors');

var port = process.env.PORT || 3000;
var app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var db = mongoose.connect(process.env.DATABASE_NAME, {
  useMongoClient: true
});


app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonWebToken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY,
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
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());

// route
var userRoutes = require('./api/routes/userRoutes');
var contactUsRoutes = require('./api/routes/contactUsRoutes');
var productsRoutes = require('./api/routes/productsRoutes');
var reqStockRoutes = require('./api/routes/reqStockRoutes');
userRoutes(app);
contactUsRoutes(app);
productsRoutes(app);
reqStockRoutes(app);


app.listen(port, function () {
  console.log('S. Aireni - Server started on port: ' + port);
});

app.use(function (req, res) {
  console.log({ url: req.originalUrl + ' not found' })
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

//todo
// set timer and renewal for jwt authentication - isNeeded?
// pagination
