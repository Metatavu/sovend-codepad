/*jshint esversion: 6 */
/* global __dirname */
(() => {
  'use strict';

  class Status {

    constructor () {
      this.status = 'WAITING_INPUT';
    }
    
    setStatus(status) {
      this.status = status;
    }
    
    getStatus() {
      return this.status;
    }
    
  }

  module.exports = new Status();
  
})();