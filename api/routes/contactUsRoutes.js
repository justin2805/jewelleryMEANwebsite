'use strict';
module.exports = function(app) {
  var contactUsController = require('../controllers/contactUsController');

  // todoList Routes
  app.route('/contactus')
    .get(contactUsController.fetchDetails)
    .post(contactUsController.uploadDetails);
};