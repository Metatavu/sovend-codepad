/*jshint esversion: 6 */
/* global __dirname */

(() => {
  'use strict';
  
  const http = require('http');
  const config = require('nconf');
  const Promise = require('bluebird');
  config.file({ file: 'config.json' });
  const app = require(__dirname + '/index');
  const options = require(__dirname + '/options');
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
    
    for (let i = 0; i < importCodes.length; i++) {
      const importCode = importCodes[i];
      const code = new Code();
      code.code = importCode;
      code.used = false;
      saves.push(code.save());
    }
    
    Promise.each(saves)
      .then(() => {
        console.log(`${saves.length} imported`);
        process.exit(0);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    app.startServer(options.getOption('port'), () => {
      console.log('Express server started');
    });
  }
  
})();
