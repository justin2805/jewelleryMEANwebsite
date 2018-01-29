'use strict';
module.exports = function (app) {
  var cartController = require('../controllers/cartController');
  var productsController = require('../controllers/productsController');
  var userController = require('../controllers/userController');
  var cors = require('cors');

  app.route('/cart')
    .get(userController.loginRequired, cartController.fetchAllOrders)
    .post(userController.loginRequired, productsController.updateProductCollectionForCartProcess, 
        cartController.placeOrder);

  app.route('/cart/:orderId')
    .get(userController.loginRequired, cartController.fetchSingleOrder)
    .put(userController.loginRequired, cartController.updateOrder);
};