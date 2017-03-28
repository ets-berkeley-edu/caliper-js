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
var config = require('./config/config');
var envelope = require('./request/envelope');
var httpRequestor = require('./request/httpRequestor');
var logger = require('./logger');
var moment = require('moment');

var msgs = [
  "Caliper sensor client has not been initialized.",
  "Caliper sensor client identifier has not been provided.",
  "Caliper sensor client data has not been provided."
];

var httpClient = {
  initialize: function initialize(id) {
    _.isNil(id) ? this.error(msgs[1]) : this.id = id;
    this.initialized = true;
  },
  isInitialized: function isInitialized() {
    return this.initialized;
  },
  getId: function getId() {
    return this.id;
  },
  createEnvelope: function createEnvelope(opts) {
    if (!this.isInitialized()) {
      this.error(msgs[0]);
    }

    if (_.isNil(opts.data)) {
      this.error(msgs[2]);
    }

    var id = opts.id || this.getId(); // permit override with opts value?
    var sendTime = opts.sendTime || moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    var dataVersion = opts.dataVersion || config.dataVersion;
    var payload = [];

    if (Array.isArray(opts.data)) {
      payload = opts.data.slice();
    } else {
      payload.push(opts.data);
    }

    return _.assign({}, envelope, {sensor: id, sendTime: sendTime, dataVersion: dataVersion, data: payload});
  },
  sendEnvelope: function sendEnvelope(envelope, opts) {
    if (!this.isInitialized()) {
      this.error(msgs[0]);
    }

    var requestor = _.create(httpRequestor);
    requestor.initialize(opts);
    requestor.sendEnvelope(envelope);
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

module.exports = httpClient;