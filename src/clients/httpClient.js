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
var request = require('request');
var clientUtils = require('./clientUtils');
var logger = require('../logger');

var client = {
  id: null,
  initialized: false,
  options: {},
  initialize: function initialize(id, options) {
    _.isNil(id) ? this.error(this.messages[1]) : this.id = id;
    _.isEmpty(options) ? this.error(this.messages[5]) : _.assign(this.options, options);
    this.initialized = true;
  },
  send: function send(envelope) {
    if (!this.initialized) {
      this.error(this.messages[0]);
    }
    if (_.isEmpty(envelope)) {
      this.error(this.messages[3]);
    }

    // Calculate Envelope length and then stringify it.
    var contentLength = clientUtils.calculateByteLength(envelope);
    var stringEntity = clientUtils.stringify(envelope);

    // Retrieve options and add Content-Length header and body.
    this.options.headers["Content-Length"] = contentLength;
    this.options.body = stringEntity;
    logger.log('debug', "Request Options: " + JSON.stringify(this.options));

    // Issue POST
    request(this.options, function (err, res, body) {
      if (err) {
        //console.error('POST failed: ', err);
        logger.log('error', "POST failed: " + err);
        throw err
      }

      // Response
      var headers = res.headers;
      var statusCode = res.statusCode;
      logger.log('debug', "Response status code: " + statusCode);
      logger.log('debug', "Response headers: " + JSON.stringify(headers));
      logger.log('debug', "Response body: " + JSON.stringify(body));
    });
  },
  error: function error(message) {
    throw new Error(message);
  },
  messages: [
    "Caliper Sensor Client has not been initialized.",
    "Caliper Sensor Client identifier (id) has not been provided.",
    "No Requestors have been registered.",
    "Chosen Requestor has not been registered.",
    "No options have been provided."
  ]
};

module.exports = client;