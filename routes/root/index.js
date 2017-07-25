/*jshint esversion: 6 */
/*global __dirname*/
(() => {
  'use strict';
  
  const Code = require(__dirname + '/../../models/code');

  module.exports = (app) => {
    
    app.get('/', (req, res, next) => {
      res.sendFile(__dirname + '/../../www/index.html');
    });
    
    app.post('/code', (req, res, next) => {
      const code = req.body.code;
      
      Code.findOne({code: code, used: false})
        .then((code) => {
          if (!code) {
            res.status(400).send();
            return;
          }
          
          code.used = true;
          code.save()
            .then(() => {
              res.status(200).send();
            })
            .catch((err) => {
              console.error(`Failed to save used for code ${code} on error ${err}`);
              res.status(400).send();
            });
        })
        .catch((err) => {
          console.error(`Failed to query for code ${code} on error ${err}`);
          res.status(400).send();
        });
    });
  };

})();