'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(process.env.DATABASE_NAME);
autoincrement.initialize(connection);

var cartSchema = new Schema({
  userId: {
      type: Number,
      required: true
  },
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
  address:{
      type: String,
      required: true
  },
  total_cost:{
      type: Number,
      required:true
  },
  order: [{
    productId: {
        type: Number,
        required: true
    },
    prod_name: {
        type: String,
        required: true
    },
    prod_ordered_qty: {
        type: Number,
        required: true
    },
    prod_cost: {
        type: Number,
        required: true
    },
    prod_cost_total: {
        type: Number,
        required: true
    }
  }],
  order_status: {
    type: String,
    enum: ['ORDER_RECEIVED', 'PAYMENT_PROCESSING','PAYMENT_RECEIVED',
    'ORDER_PROCESSING','DELIVERY_IN_PROGRESS', 'PAYMENT_NOT_RECEIVED',
    'ORDER_DELIVERED','ORDER_CANCELLED','ORDER_FAILED','NO_PROGRESS'],
    default: ['NO_PROGRESS']
  },
  order_comments: {
      type: String,
      required: false
  },
  payment_reference_no: {
      type: String
  },
  ordered_date: {
    type: Date,
    default: Date.now
  }
});
cartSchema.plugin(autoincrement.plugin,{model : 'Cart', field:'orderId', startAt: 1});

module.exports = mongoose.model('Cart', cartSchema);