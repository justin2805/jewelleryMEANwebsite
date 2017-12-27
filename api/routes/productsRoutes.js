'use strict';
module.exports = function (app) {
  var productsController = require('../controllers/productsController');
  var userController = require('../controllers/userController');

  app.route('/products')
    .get(productsController.fetchAllProducts)
    .post(userController.loginRequired, productsController.uploadProducts);

  app.route('/products/:productId')
    .get(productsController.fetchSingleProduct)
    .put(userController.loginRequired, productsController.updateProduct)
    .delete(userController.loginRequired, productsController.deleteProduct);
};