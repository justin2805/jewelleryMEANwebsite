'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(process.env.DATABASE_NAME);
autoincrement.initialize(connection);

var contactUsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNo:{
      type: Number,
      required: true
  },
  subject: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  sent_date: {
    type: Date,
    default: Date.now
  }
});
contactUsSchema.plugin(autoincrement.plugin,{model : 'ContactUs', field:'entryId', startAt: 1});

module.exports = mongoose.model('ContactUs', contactUsSchema);