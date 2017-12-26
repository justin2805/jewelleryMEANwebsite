'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');

  // todoList Routes
  app.route('/users')
    .post(userController.registerUser);
};