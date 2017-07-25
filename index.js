/*jshint esversion: 6 */
/* global __dirname */

(() => {
  'use strict';
  
  const express = require('express');
  const path = require('path');
  const mongoose = require('mongoose');
  const config = require('nconf');
  const util = require('util');  
  const app = express();
  const http = require('http').Server(app);
  const bodyParser = require('body-parser');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static(path.join(__dirname, 'www')));
  require('./routes')(app);
  
  exports.startServer = (port, callback) => {
    http.listen(port, callback);
  };
  
  exports.close = (callback) => {
    http.shutdown(callback);
  };
  
})();