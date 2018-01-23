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
var moment = require('moment');

/**
 * Caliper envelope
 * @type {{sensor: null, sendTime: null, dataVersion: null, data: Array}}
 */
var proto = {
  sensor: null,
  sendTime: null,
  dataVersion: null,
  data: []
};

/**
 * Factory function
 * @returns {*}
 */
var createEnvelope = function createEnvelope() {
  var sendTime = moment.utc().toISOString();
  var dataVersion = config.dataVersion;

  return _.assign({}, proto, {sendTime: sendTime, dataVersion: dataVersion})
};

// Object delegation
var envelope = createEnvelope();

module.exports = envelope;

