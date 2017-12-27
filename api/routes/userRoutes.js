'use strict';
module.exports = function (app) {
  var userController = require('../controllers/userController');

  // todoList Routes
  app.route('/register')
    .post(userController.registerUser);

  app.route('/sign_in')
    .post(userController.sign_in);
};