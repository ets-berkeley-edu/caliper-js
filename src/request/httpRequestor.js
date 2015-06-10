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
var http = require('https');
// var Q = require('q');
var logger = require('../logger');
var moment = require('moment');
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
 * @param options $options passed straight to the self
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
 * @param sensor
 * @param data
 */
self.createEnvelope = function(sensor, data) {
    return requestor.createEnvelope(sensor, data);
};

/**
 * Retrieve payload.
 * @param sensor
 * @param data
 * @returns payload
 */
self.getJsonPayload = function(sensor, data) {
    return requestor.getJsonPayload(sensor, data);
};

/**
 * Send Caliper data.
 * @param sensor
 * @param data
 */
self.send = function(sensor, data) {
    if (initialized()) {
        logger.log('debug', "Sending data " + JSON.stringify(data));

        // Create the Envelope payload
        var jsonPayload = requestor.getJsonPayload(sensor, data);

        logger.log('debug', "Added data to envelope " + JSON.stringify(jsonPayload));

        // Add Headers
        var headers = {
            'Content-Type': 'application/json',
            'Content-Length': jsonPayload.length
        };

        // Merge headers
        var sendOptions = _.merge(options, {method: 'POST'}, {headers: headers});

        logger.log('debug', 'httpRequestor: about to request using sendOptions = ' + JSON.stringify(sendOptions));

        // Create request
        var request = http.request(sendOptions, function (response) {
            logger.log('info', "finished sending. Response = " + JSON.stringify(response));
        }, function(error){
            logger.log('error', "ERROR sending event = " + ERROR);
        });

        // Write request
        request.write(jsonPayload);
        request.end();

    } else {
        logger.log('error', "httpRequestor is not initialized!");
    }
};

module.exports = {
    initialize: self.initialize,
    createEnvelope: self.createEnvelope,
    getJsonPayload: self.getJsonPayload,
    send: self.send
};