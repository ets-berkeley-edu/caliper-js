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

 /**
 * Caliper Sensor
 * @class
 */
var _ = require('lodash-node');
var client = require('./client');
var logger = require('./logger');
var caliperCommon = require('./sensor-common');

/**
 * Grab an existing namespace object or create a blank object if it doesn't exist
 * so we can attach non-sensor module exports to it
 * @type {{}|*|Caliper}
 */
var Caliper = caliperCommon.init({});

// Replace/create Caliper in global namespace
exports.Caliper = Caliper;

logger.log('debug', "Exported Caliper...");
