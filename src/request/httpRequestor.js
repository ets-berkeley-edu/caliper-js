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

var msgs = [
  "Caliper requestor has not been initialized.",
  "Caliper requestor options have not been provided.",
  "Caliper envelope has not been provided.",
  "Caliper request headers set: ",
  "Caliper envelope sent: "
];

var httpRequestor = {
  initialize: function initialize(opts) {
    _.isNil(id) ? this.error(msgs[1]) : this.options = _.assign({}, httpOptions, opts);
    this.initialized = true;
  },
  isInitialized: function isInitialized() {
    return this.initialized;
  },
  getOptions: function getOptions() {
    return this.options;
  },
  postEnvelope: function postEnvelope(envelope) {
    if (!this.isInitialized()) {
      this.error(msgs[0]);
    }

    if (_.isNil(envelope)) {
      this.error(msgs[2]);
    }

    var opts = this.getOptions();
    opts.headers["Content-Length"] = Buffer.byteLength(envelope); // decimal number of OCTETS per RFC 2616

    logger.log("debug", msgs[3] + JSON.stringify(this.options));

    // Stringify the envelope
    var payload = self.stringify(envelope);

    // Create request
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
      logger.log("debug", msgs[4] + payload);
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
  },
  sendEnvelope: function sendEnvelope(envelope) {
    if (!this.isInitialized()) {
      this.error(msgs[0]);
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
  }
};

module.exports = httpRequestor;