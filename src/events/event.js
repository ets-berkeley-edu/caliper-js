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
var config = require('../config/config');
var eventType = require('./eventType').event;

var proto = {
  id: null,
  type: null,
  actor: {},
  action: null,
  object: {},
  eventTime: null,
  generated: {},
  target: {},
  referrer: {},
  edApp: {},
  group: {},
  membership: {},
  session: {},
  federatedSession: {},
  extensions: {}
};

/**
 * Factory function
 * @returns {*}
 */
var createEvent = function createEvent() {
  var context = {'@context': eventType.context};
  var defaults = {type: eventType.term};

  return config.dataFormat === "JSON-LD" ? _.assign({}, context, proto, defaults) : _.assign({}, proto, defaults)
};

// Object delegation
var event = createEvent();

module.exports = event;