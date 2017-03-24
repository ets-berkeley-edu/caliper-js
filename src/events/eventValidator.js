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
var validator = require('../validator');

/**
 * Check required Event properties against set of user-supplied values
 * @param delegate
 * @param opts
 * @returns {*}
 */
module.exports.checkOpts = function opts(delegate, opts) {
  Object.keys(delegate).forEach(function(key) {
    switch (key) {
      case "@context":
        if (validator.hasCaliperContext(delegate)) {
          delete opts['@context']; // suppress
        }
        break;
      case "type":
        if (validator.hasType(delegate)) {
          delete opts.type; // suppress
        } else {
          if (!validator.hasType(opts.type)) {
            throw new Error("Required type not provided");
          }
        }
        break;
      case "id":
        if (!validator.hasUuidUrn(opts)) {
          opts.id = "urn:uuid:" + validator.generateUUID(config.uuidVersion);
        }
        break;
      case "actor":
        if (!validator.hasActor(opts)) {
          throw new Error("Required actor not provided");
        }
        break;
      case "action":
        if (!validator.hasAction(opts)) {
          throw new Error("Required action not provided");
        }
        break;
      case "object":
        if (!validator.hasObject(opts)) {
          throw new Error("Required object not provided");
        }
        break;
      case "eventTime":
        if (!validator.hasEventTime(opts)) {
          throw new Error("Required ISO 8601 formatted eventTime not provided");
        }
        break;
    }
  });
  return opts;
};