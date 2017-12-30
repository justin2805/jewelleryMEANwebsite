'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var autoincrement = require('mongoose-auto-increment');
var bcrypt = require('bcrypt');

var connection = mongoose.createConnection(process.env.DATABASE_NAME);
autoincrement.initialize(connection);


var usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: ['USER']
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

usersSchema.plugin(uniqueValidator);
usersSchema.plugin(autoincrement.plugin, { model: 'Users', field: 'userId', startAt: 1000 });
usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('Users', usersSchema);