'use strict';
module.exports = function(app) {
  var reqStockController = require('../controllers/reqStockController');

  // todoList Routes
  app.route('/reqStock')
    .get(reqStockController.fetchDetails)
    .post(reqStockController.uploadDetails);
};