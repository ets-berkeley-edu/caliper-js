/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var http = require('http');
var https = require('https');
var config = require('../config/config');
var options = require('./options');
var logger = require('../logger');
var clientUtils = require('./clientUtils');

/**
 * Caliper self.
 * @constructor
 * @type {{}}
 */
var self = this;
var id;
var initialized = false;
var options = {};

/**
 * Initializes the default client to use.
 * Client#initialize
 * @memberof client
 * @function initialize
 * @param id client identifier
 */
self.initialize = function initialize(id, options) {
  _.isNil(id) ? self.error(messages[1]) : this.id = id;
  this.options = options;

  //this.options = _.merge({}, options, options);
  /**
   if (!_.isNil(options)) {
    this.options = _.merge({}, options, options);
  } else {
    this.options = _.merge({}, options);
  }
   */

  this.initialized = true;
};

/**
 * Check if Client is initialized.
 * @memberof client
 * @function isInitialized
 * @returns {boolean}
 */
self.isInitialized = function isInitialized() {
  return this.initialized;
};

/**
 * Get the Client identifier.
 * @memberof client
 * @function getId
 * @returns {*}
 */
self.getId = function getId() {
  return this.id;
};

/**
 * Get Options.
 * @memberof client
 * @function getOptions
 * @returns {*}
 */
self.getOptions = function getOptions() {
  return this.options;
};

/**
 * Post the Envelope.
 * @memberof httpRequestor
 * @function postEnvelope
 * @param envelope
 */
self.send = function send(envelope) {
  /**
   if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */

  /*
   if (_.isNil(envelope)) {
   self.error(messages[3]);
   }
   */

  // Retrieve options
  var opts = this.getOptions();
  opts.headers["Content-Length"] = Buffer.byteLength(envelope); // decimal number of OCTETS per RFC 2616

  console.log("Sensor Client options = " + JSON.stringify(opts));

  // Stringify the envelope
  var payload = self.stringify(envelope);

  logger.log('debug', "Sending data " + JSON.stringify(envelope));

  // Create request
  var request = http.request(opts, function (response) {
    logger.log('debug', "Response received = " + JSON.stringify(response));
  }, function(error){
    logger.log('error', "ERROR sending event = " + error);
  });

  // Write request
  request.write(payload);
  request.end();


  // Create request

  /**
   if (opts.protocol === "https:") {
    var request = https.request(opts, function(response) {
      var res = "";
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        res += chunk;
      });
      response.on('end', function() {
        callback(res);
      });
    });

    request.on('error', function(e) {
      logger.log("error", e.message);
    });

    // Write data to request body.
    request.write(payload);
    logger.log("debug", messages[5] + payload);
    request.end();

  } else {
    var request = http.request(opts, function(response) {
      var res = "";
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        res += chunk;
      });
      response.on('end', function() {
        callback(res);
      });
    });

    request.on('error', function(e) {
      logger.log("error", e.message);
    });

    // Write data to request body.
    request.write(payload);
    request.end();
  }
   */
};

/**
 * Stringify the payload.
 * @memberof client
 * @function stringify
 * @param payload
 * @returns {*}
 */
self.stringify = function stringify(payload) {
  return clientUtils.stringify(payload);
};

/**
 * Error Handler.
 * @memberof sensor
 * @function error
 * @param message
 */
self.error = function error(message) {
  throw new Error(message);
};

/**
 * Error messages.
 * @memberof client
 */
var messages = [
  "Caliper Sensor Client has not been initialized.",
  "Caliper Sensor Client identifier (id) has not been provided.",
  "No Requestors have been registered.",
  "Chosen Requestor has not been registered."
];

module.exports = {
  initialize: self.initialize,
  initialized: self.isInitialized,
  getId: self.getId,
  getOptions: self.getOptions,
  postEnvelope: self.postEnvelope,
  sendToClients: self.sendToClients
};