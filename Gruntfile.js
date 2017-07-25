/* jshint esversion: 6 */
/* global module:false */

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const pug = require('pug');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    'sass': {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'www/css',
          ext: '.min.css'
        }]
      }
    },
    'pug': {
      compile: {
        options: {
          data: function(dest, src) {
            return require('./config.json');
          }
        },
        files: [{
          expand: true,
          cwd: 'src/templates',
          src: ['*.pug'],
          dest: 'www',
          ext: '.html'
        }]
      }
    },
    'babel': {
      options: {
        sourceMap: true,
        minified: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['*.js'],
          dest: 'www/js/',
          ext: '.js'
        }]
      }
    },
    wiredep: {
      target: {
        src: 'www/index.html'
      }
    }
  });
  
  grunt.registerTask('default', [ 'sass', 'pug', 'babel', 'wiredep' ]);
};