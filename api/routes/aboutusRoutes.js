'use strict';
module.exports = function(app) {
  var aboutusController = require('../controllers/aboutusController');

  // todoList Routes
  app.route('/aboutus')
    .get(aboutusController.fetchDetails)
    .put(aboutusController.uploadDetails);
};