'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
  term:  String,
  page: Number,
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Search',searchSchema);
