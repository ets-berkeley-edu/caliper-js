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
var logger = require('../logger');

/**
 * Represents httpRequestor self.
 * @constructor httpRequestor
 */
var self = this;

/**
 * Serializer replacer function that removes nulls, empty objects and arrays
 **/
self.replacer = function(name, val) {
  logger.log('debug', 'info', "Replacing name = " + name + " value = " + val);
  if (val === null) {
    logger.log('debug', "removing name = " + name + " from output (NULL)");
    return undefined;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) {
      logger.log('debug', "removing name = " + name + " from output (EMPTY ARRAY)");
      return undefined;
    }
  }

  if (typeof val === 'object') {
    if (Object.keys(val).length === 0) {
      logger.log('debug', "removing name = " + name + " from output (EMPTY OBJECT)");
      return undefined;
    }
  }
  return val;
}

self.parseForNullsAndEmpty = function(jsObject) {
  return JSON.parse(JSON.stringify(jsObject, self.replacer));
};

self.serializeToJson = function(jsObject) {
  return JSON.stringify(jsObject, self.replacer);
};


module.exports = {
  serialize: self.serializeToJson,
  parseForNullsAndEmpty: self.parseForNullsAndEmpty
};
