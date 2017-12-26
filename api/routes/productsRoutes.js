'use strict';
module.exports = function (app) {
  var productsController = require('../controllers/productsController');

  app.route('/products')
    .get(productsController.fetchAllProducts)
    .post(productsController.uploadProducts);

  app.route('/products/:productId')
    .get(productsController.fetchSingleProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct);
};