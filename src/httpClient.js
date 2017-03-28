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

var httpClient = {
  init: function init(id) {
    if (_.isNil(id)) {
      this.error(this.messages[1]);
    }
    this.id = id;
    this.initialized = true;
  },
  isInit: function isInit() {
    return this.initialized;
  },
  getId: function getId() {
    return this.id;
  },
  createEnvelope: function createEnvelope(opts) {
    if (!this.isInit()) {
      this.error(this.messages[0]);
    }
    var id = opts.id || this.getId(); // permit override?
    var sendTime = opts.sendTime || moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    var dataVersion = opts.dataVersion || config.dataVersion;
    if (_.isNil(opts.data)) {
      this.error(this.messages[2]);
    }
    var payload = [];

    if (Array.isArray(opts.data)) {
      payload = opts.data.slice();
    } else {
      payload.push(opts.data);
    }

    return _.assign({}, envelope, {sensor: id, sendTime: sendTime, dataVersion: dataVersion, data: payload});
  },
  sendEnvelope: function sendEnvelope(envelope, opts) {
    if (!this.isInit()) {
      this.error(this.messages[0]);
    }
    var requestor = _.create(httpRequestor);
    requestor.init(opts);
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
  },
  messages: [
    "Sensor client has not been initialized.",
    "Sensor client identifier not provided.",
    "Sensor client data not provided."
  ]
};

module.exports = httpClient;