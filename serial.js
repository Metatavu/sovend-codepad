/*jshint esversion: 6 */
/* global __dirname */
(() => {
  'use strict';

  const SerialPort = require('serialport');
  const conf = require('nconf');

  class Serial {

    constructor (device, baudRate, startByte, stopByte) {
      this.startByte = startByte;
      this.stopByte = stopByte;

      this.port = new SerialPort(device, {
        baudRate: baudRate
      });

      this.message = [];
      this.onMessageListeners = [];

      this.port.on('data', this._onData.bind(this));
    }
    
    onMessage(callback) {
      this.onMessageListeners.push(callback);
    }

    sendData(message) {
      let data = new Buffer([this.startByte]);
      data = Buffer.concat([data, Buffer.from(message, 'utf8')]);
      data = Buffer.concat([data, new Buffer([this.stopByte])]);
      this.port.write(data);
    }

    _receiveByte(byte) {
      if (this.startByte === byte) {
        this.message = [];
      } else if (this.stopByte === byte) {
        this._triggerMessageEvent();
      } else {
        this.message.push(byte);
      }
    }

    _triggerMessageEvent() {
      const messageString = new Buffer(this.message).toString('utf8');
      for (let i = 0; i < this.onMessageListeners.length; i++) {
        this.onMessageListeners[i](messageString);
      }
    }

    _onData(data) {
      for (let i = 0; i < data.length; i++) {
        this._receiveByte(data[i]);
      }
    }    
  }

  module.exports = new Serial(conf.get('serial:device'), conf.get('serial:baudRate'), conf.get('serial:startByte'), conf.get('serial:stopByte'));
  
})();