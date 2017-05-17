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
var envelope = require('../envelope');
var hashMap = require('hashmap');
var logger = require('../logger');

/**
 * Caliper self.
 * @constructor
 * @type {{}}
 */
var self = this;
var id;
var initialized = false;
var requestors = new hashMap();

/**
 * Initializes the default client to use.
 * Client#initialize
 * @memberof client
 * @function initialize
 * @param id requestor identifier
 */
self.initialize = function initialize(id) {
  _.isNil(id) ? self.error(messages[1]) : this.id = id;
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
 * Register Requestor.
 * @memberof client
 * @function registerRequestor
 * @param requestor
 */
self.registerRequestor = function registerRequestor(requestor) {
  requestors.set(requestor.id, requestor);
};

/**
 * Unregister Requestor.
 * @memberof client
 * @function unregisterRequestor
 * @param key
 */
self.unregisterRequestor = function unregisterRequestor(key) {
  requestors.remove(key);
};

/**
 * Retrieve a Requestor.
 * @memberof client
 * @function getRequestor
 * @param key
 * @returns {*}
 */
self.getRequestor = function getRequestor(key) {
  return requestors.get(key);
};

/**
 * Retrieve all registered Requestors.
 * @memberof client
 * @function getRequestors
 * @returns {HashMap}
 */
self.getRequestors = function getRequestors() {
  return requestors;
};

/**
 * Create and return envelope comprised of events, entities or a mixed data payload of both.
 * @memberof client
 * @function createEnvelope
 * @param opts  Envelope properties
 * @returns {*}
 */
self.createEnvelope = function createEnvelope(opts) {
  /**
  if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */
  if (_.isNil(opts.data)) {
    self.error(messages[2]);
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
};

/**
 * Delegate serialization and transmission of the Envelope to all registered Requestors.
 * @memberof client
 * @function sendEnvelope
 * @param envelope
 */
self.sendEnvelope = function sendEnvelope(envelope) {
  /**
  if (!self.isInitialized()) {
    self.error(messages[0]);
  }
   */
  if (requestors.count() > 0) {
    requestors.forEach(function(requestor) {
      requestor.sendEnvelope(envelope);
    });
  } else {
    self.error(messages[2])
  }
};

/**
 * Delegate serialization and transmission of the Envelope to a particular Requestor.
 * @memberof sensor
 * @function sendEnvelope
 * @param requestor
 * @param envelope
 */
self.sendEnvelopeToRequestor = function sendEnvelopeToRequestor(requestor, envelope) {
  if (!self.isInitialized()) {
    self.error(messages[0]);
  }
  if (requestors.has(requestor.id)) {
    requestor.sendEnvelope(envelope);
  } else {
    self.error(messages[3]);
  }
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
  registerRequestor: self.registerRequestor,
  unregisterRequestor: self.unregisterRequestor,
  getRequestor: self.getRequestor,
  getRequestors: self.getRequestors,
  createEnvelope: self.createEnvelope,
  sendEnvelope: self.sendEnvelope,
  sendEnvelopeToRequestor: self.sendEnvelopeToRequestor
};