'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.DATABASE_NAME);
autoincrement.initialize(connection);


var productsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
  },
  quality: {
    type: String,
  },
  safety_info: {
    type: String,
  },
  legal_disclaimer: {
    type: String,
  },
  cost: {
      type: Number
  },
  quantity: {
    type: Number
  },
  productType: {
    type: String,
    enum: ['JEWELLERY', 'MOBILE CASE', 'ACCESSORIES','OTHERS'],
    default: ['OTHERS']
  },
  product_imagePaths: [{
      type: String
  }],
  Created_date: {
    type: Date,
    default: Date.now
  },
});

productsSchema.plugin(autoincrement.plugin,{model : 'Products', field:'productId', startAt: 1});

module.exports = mongoose.model('Products', productsSchema);