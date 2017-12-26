'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aboutusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  about:{
      type: String,
      default: "about"
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('AboutUs', aboutusSchema);