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

var config = require('../config');
var uuid = require('node-uuid');

/**
 * Generate a RFC 4122 v1 timestamp-based UUID or a v4 "practically random" UUID.  Default is v4.
 * @returns {*}
 */
module.exports.generateUUID = function generateUUID(version) {
  var v = version || config.uuidVersion;

  switch(v) {
    case 4:
      return uuid.v4();
      break;
    case 1:
      return uuid.v1();
      break;
    default:
      return uuid.v4();
  }
};