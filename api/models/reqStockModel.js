'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(process.env.DATABASE_NAME);
autoincrement.initialize(connection);

var requestStockSchema = new Schema({
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
  prod_id: {
    type: Number,
    required: true
  },
  prod_name: {
    type: String,
    default: ""
  },
  prod_qty: {
    type: Number,
    required: true
  },
  sent_date: {
    type: Date,
    default: Date.now
  }
});
requestStockSchema.plugin(autoincrement.plugin,{model : 'RequestStock', field:'entryId', startAt: 1});

module.exports = mongoose.model('RequestStock', requestStockSchema);