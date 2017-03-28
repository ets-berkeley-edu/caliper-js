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
var moment = require('moment');
var httpOptions = require('../config/httpOptions');
var requestorUtils = require('./requestorUtils');

var requestor = {
  init: function init(opts) {
    if (_.isNil(opts)) {
      this.error(this.messages[1]);
    }
    this.options = _.assign({}, httpOptions, opts);
    this.initialized = true;
  },
  isInit: function isInit() {
    return this.initialized;
  },
  postEnvelope: function postEnvelope(envelope) {
    if (!this.isInit()) {
      this.error(this.messages[0]);
    }
    // Set to decimal number of OCTETS per RFC 2616
    this.options.headers["Content-Length"] = Buffer.byteLength(envelope);

    // logger.log('debug', 'httpRequestor: about to request using options = ' + JSON.stringify(this.options));

    // Stringify the envelope
    var payload = self.stringify(envelope);

    // Create request
    if (this.options.protocol === "https:") {
      var request = https.request(this.options, function(response) {
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
        this.error(e.message);
      });

      // Write data to request body.
      request.write(payload);
      request.end();

    } else {
      var request = http.request(this.options, function(response) {
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
        this.error(e.message);
      });

      // Write data to request body.
      request.write(payload);
      request.end();
    }
  },
  sendEnvelope: function sendEnvelope(envelope) {
    if (!this.isInit()) {
      this.error(this.messages[0]);
    }
      this.postEnvelope(envelope);
  },
  stringify: function stringify(payload) {
    return requestorUtils.stringify(payload);
  },
  error: function error(msg) {
    throw new Error(msg);

    /*
     try {
     throw new Error(msg);
     } catch (e) {
     logger.log("error", e.message);
     }
     */
  },
  messages: [
    "Requestor has not been initialized.",
    "Requestor options not provided."
  ]
};

module.exports = requestor;