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
var http = require('https');
var logger = require('../logger');
var requestor = require('./eventStoreRequestor');

/**
 * Represents httpRequestor self.
 * @constructor httpRequestor
 */
var self = this;
var options = {};

/*
 * Check if self is properly initialized
 */
var initialized = function() {
  return true; //TODO
};

/**
 * Initializes the default self to use.
 * @function initialize
 * @param sensorOptions $options passed straight to the self
 */
self.initialize = function(sensorOptions) {
  if (!_.isUndefined(sensorOptions)) {
      options = sensorOptions;
  }
  requestor.initialize(sensorOptions);
  logger.log('debug', "Initialized httpRequestor with options " + JSON.stringify(options));
};

/**
 * Create envelope.
 * @param id
 * @param sendTime
 * @param dataVersion
 * @param data
 * @returns {*}
 */
self.createEnvelope = function(id, sendTime, dataVersion, data) {
  return requestor.createEnvelope(id, sendTime, dataVersion, data);
};

/**
 * Emit Caliper dimensional data (entity).
 * @param sensor
 * @param data
 */
self.describe = function(sensor, data) {
  self.post(sensor, data);
};

/**
 * Issue a POST request.
 * @param sensor
 * @param data
 */
self.post = function(sensor, data) {
  if (initialized()) {

    // Create and Serialize envelope payload
    var sendTime = moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    var envelope = self.createEnvelope(sensor.id, sendTime, config.dataVersion, data);
    var payload = self.serialize(envelope);

    logger.log('debug', "Payload created.");

    // Add Headers
    var headers = {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    };

    // Merge headers
    var sendOptions = _.merge(options, {method: 'POST'}, {headers: headers});

    logger.log('debug', 'httpRequestor: about to request using sendOptions = ' + JSON.stringify(sendOptions));

    // Create request
    var request = http.request(sendOptions, function (response) {
      logger.log('info', "finished sending. Response= " + JSON.stringify(response));
    }, function(error){
      logger.log('error', "ERROR sending event = " + error);
    });

    // Write request
    request.write(payload);
    request.end();

  } else {
    logger.log('error', "httpRequestor is not initialized!");
  }
};


/**
 * Emit Caliper Event data.
 * @param sensor
 * @param data
 */
self.send = function(sensor, data) {
  self.post(sensor, data);
};

/**
 * Serialize payload.
 * @param payload
 * @returns {*}
 */
self.serialize = function(payload) {
  return requestor.serialize(payload);
};

module.exports = {
  initialize: self.initialize,
  createEnvelope: self.createEnvelope,
  describe: self.describe,
  post: self.post,
  send: self.send,
  serialize: self.serialize
};