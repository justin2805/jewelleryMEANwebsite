'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var autoincrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/saireni");
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
usersSchema.plugin(autoincrement.plugin,{model : 'Users', field:'userId', startAt: 1000});

module.exports = mongoose.model('Users', usersSchema);