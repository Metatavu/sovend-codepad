/*jshint esversion: 6 */
/* global __dirname */

(function() {
  'use strict';

  module.exports = function(app) {
    
    // Register routes

    require(__dirname + '/root')(app);
    
  };

}).call(this);