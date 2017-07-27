/*jshint esversion: 6 */
/* global __dirname */
(() => {
  'use strict';

  class Status {

    constructor () {
      this.status = this.WAITING_INPUT;
      this.currentCode = null;
      this.selectionTimeout = null;
    }

    get WAITING_INPUT() {
      return 'WAITING_INPUT';
    }

    get WAITING_SELECTION() {
      return 'WAITING_SELECTION';
    }
    
    get WAITING_PRODUCT() {
      return 'WAITING_PRODUCT';
    }
    
    setStatus(status) {
      if (this.selectionTimeout) {
        clearTimeout(this.selectionTimeout);
        this.selectionTimeout = null;
      }
      if (status !== this.WAITING_INPUT) {
        this.selectionTimeout = setTimeout(() => {
          this.setStatus(this.WAITING_INPUT);
        }, 60 * 1000);
      }
      
      this.status = status;
    }
    
    getStatus() {
      return this.status;
    }
    
    setCode(code) {
      this.currentCode = code;
    }
    
    getCode() {
      return this.currentCode;
    }
    
  }

  module.exports = new Status();
  
})();