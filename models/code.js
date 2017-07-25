/*jshint esversion: 6 */
/* global __dirname */

(() => {
  'use strict';
  
  const mongoose = require('mongoose');

  const codeSchema = mongoose.Schema({
    code : { type: String, index: true },
    used : { type: Boolean, default: false }
  });

  module.exports = mongoose.model('Code', codeSchema);
  
})();
