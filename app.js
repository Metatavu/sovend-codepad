/*jshint esversion: 6 */
/* global __dirname */

(() => {
  'use strict';
  
  const http = require('http');
  const config = require('nconf');
  const Promise = require('bluebird');
  const async = require('async');
  const options = require(__dirname + '/options');
   
  config.file({ file: options.getOption('conf') || 'config.json' });
  const app = require(__dirname + '/index');
 
  const mongoose = require('mongoose');
  
  mongoose.Promise = Promise;
  mongoose.connect('mongodb://' + config.get('database:host') + '/' + config.get('database:table'), { useMongoClient: true });
  
  const Code = require(__dirname + '/models/code');
  
  if (!options.isOk()) {
    options.printUsage();
    process.exitCode = 1;
    return;
  }
  
  if (options.getOption('codes')) {
    const importCodes = require(options.getOption('codes'));
    const saves = [];
    
    function createSave(importCode) {
      return (callback) => {
        const code = new Code();
        code.code = importCode;
        code.used = false;
        
        code.save(callback); 
      }
    };
    
    for (let i = 0; i < importCodes.length; i++) {
      saves.push(createSave(importCodes[i]));
    }
    
    async.parallelLimit(saves, 5, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${saves.length} imported`);
        process.exit(0);
      }
    });
  } else {
    app.startServer(options.getOption('port'), () => {
      console.log('Express server started');
    });
  }
  
})();
