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

var _ = require('lodash-node');
var logger = require('../logger');
var moment = require('moment');
var Envelope = require('./envelope');

/**
 * Represents eventStoreRequestor self.
 * @constructor eventStoreRequestor
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
 * @param options $options passed straight to the self
 */
self.initialize = function(sensorOptions) {
    if (!_.isUndefined(sensorOptions)) {
        options = sensorOptions;
    }
    // logger.log('info', "Initializing Requestor with options " + JSON.stringify(options));
};

/**
 * Create envelope
 * @param sensor
 * @param data
 */
self.createEnvelope = function(sensor, data) {
    var envelope = new Envelope();
    envelope.sensor = sensor.id;
    envelope.sendTime = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    if (Array.isArray(data)) {
        envelope.data = data;
    } else {
        envelope.data = [data];
    }

    return envelope;
};

/**
 * Generate JSON. Private method that is not exported.
 * @param envelope
 */
self.generateJsonPayload = function generateJsonPayload(payload) {
    return JSON.stringify(payload);
}

/**
 * Retrieve payload.
 * @param sensor
 * @param data
 * @returns payload
 */
self.getJsonPayload = function(sensor, data) {
    return self.generateJsonPayload(self.createEnvelope(sensor, data));
};

/**
 * Abstract send method. Implement in a sub-module.
 * @param sensor
 * @param data
 */
self.send = function(sensor, data) {
    throw new Error('Method `eventStoreRequestor::send()` must be implemented in a sub-module.');
};

module.exports = {
    initialize: self.initialize,
    createEnvelope: self.createEnvelope,
    getJsonPayload: self.getJsonPayload,
    send: self.send
};