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
var logger = require('../logger');
var httpOptions = require('../config/httpOptions');
var requestorUtils = require('./requestorUtils');

/**
 * @constructor
 * @type {{}}
 */
var self = this;
var id;
var initialized = false;
var options = {};

/**
 * Initialize Requestor.
 * @memberof httpRequestor
 * @function initialize
 * @param opts
 */
self.initialize = function initialize(id, opts) {
  _.isNil(id) ? self.error(messages[1]) : this.id = id;
  this.options = _.assign({}, httpOptions, opts);
  /**
  if (!_.isNil(opts)) {
    this.options = _.assign({}, httpOptions, opts);
  } else {
    this.options = _.assign({}, httpOptions);
  }
   */

  console.log("REQUESTOR INITIALIZATION WITH OPTS " + requestorUtils.stringify(this.options));

  this.initialized = true;
};

/**
 * Check if Requestor is initialized.
 * @memberof httpRequestor
 * @function isInitialized
 * @returns {boolean}
 */
self.isInitialized = function isInitialized() {
  return this.initialized;
};

/**
 * Get the Requestor identifier.
 * @memberof httpRequestor
 * @function getId
 * @returns {*}
 */
self.getId = function getId() {
  return this.getId();
};

/**
 * Get Requestor Options.
 * @memberof httpRequestor
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
self.postEnvelope = function postEnvelope(envelope) {
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

  var opts = this.getOptions();
  opts.headers["Content-Length"] = Buffer.byteLength(envelope); // decimal number of OCTETS per RFC 2616

  logger.log("debug", messages[4] + JSON.stringify(this.options));

  // Stringify the envelope
  var payload = self.stringify(envelope);

  //logger.log('debug', "Sending data " + JSON.stringify(envelope));

  // Create the Envelope payload
  //var jsonPayload = requestor.getJsonPayload(sensor, data);

  logger.log('debug', "Added data to envelope " + JSON.stringify(payload));

  // Add Headers
  var headers = {
    'Content-Type': 'application/json'
  };

  // Add Headers
  /**
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  };
   */

  // Merge headers
  var sendOptions = _.merge(options, {method: 'POST'}, {headers: headers});

  console.log('httpRequestor: about to request using sendOptions = ' + JSON.stringify(sendOptions));

  // Create request
  var request = http.request(sendOptions, function (response) {
    logger.log('info', "finished sending. Response = " + JSON.stringify(response));
  }, function(error){
    logger.log('error', "ERROR sending event = " + ERROR);
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
 * Send Envelope
 * @memberof httpRequestor
 * @function sendEnvelope
 * @param envelope
 */
self.sendEnvelope = function sendEnvelope(envelope) {
  /**
   if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */
  this.postEnvelope(envelope);
};

/**
 * Stringify the payload.
 * @memberof httpRequestor
 * @function stringify
 * @param payload
 * @returns {*}
 */
self.stringify = function stringify(payload) {
  return requestorUtils.stringify(payload);
};

/**
 * Error Handler.
 * @memberof httpRequestor
 * @function error
 * @param message
 */
self.error = function error(message) {
  throw new Error(message);
};

/**
 * Error messages.
 * @memberof httpRequestor
 */
var messages = [
  "Caliper requestor has not been initialized.",
  "Caliper requestor identifier (id) has not been provided.",
  "Caliper requestor options have not been provided.",
  "Caliper envelope has not been provided.",
  "Caliper request headers set: ",
  "Caliper envelope sent: "
];

module.exports = {
  initialize: self.initialize,
  isInitialized: self.isInitialized,
  getId: self.getId,
  getOptions: self.getOptions,
  postEnvelope: self.postEnvelope,
  sendEnvelope: self.sendEnvelope
};