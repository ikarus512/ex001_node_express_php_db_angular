var should = require('should'); 
var expect = require('expect'); 
var assert = require('assert');
var request = require('supertest');  
//var mongoose = require('mongoose');
//var winston = require('winston');
//var config = require('./config-debug');
//src_server/index.js

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // (but want only allow self-assigned sert)

describe('Routing', function() {
  var url = 'https://localhost';

  describe('Login', function() {
    it('should allow tester login', function(done) {

      request(url)
      .post('/login')
      .send({id:'tester',password:'tester'})
      .end(function(err, res) {
              if (err) {
                throw err;
              }
              // this is should.js syntax, very clear
              //res.should.have.status(400);
              should(res).have.property('status', 302);
              done();
      });
    });
  });
});
