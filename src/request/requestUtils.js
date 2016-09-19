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

var logger = require('../logger');

var objPropNames = [ "actor", "object", "generated", "target", "referrer", "edApp", "group", "membership",
  "session", "federatedSession", "learningObjectives", "annotated", "assignable", "attempt", "isPartOf", "member",
  "organization", "replyTo", "scoredBy", "subOrganizationOf", "withAgents" ];

var ctxRegex = new RegExp(/http:\/\/purl.imsglobal.org\/ctx\/caliper/);

/**
 * Represents httpRequestor self.
 * @constructor httpRequestor
 */
var self = this;

/**
 * Serializer replacer function that removes properties with values that are either null or empty or
 * represent a duplicate Caliper @context property.  Note that the Envelope.data array may contain
 * one or more events or describes (i.e., entities).  In such cases, @context property filtering is
 * applied only to the object properties of each event or entity comprising the array.
 * @param key
 * @param val
 * @returns {*}
 */
self.replacer = function(key, val) {
  if (val === null) {
    logger.log('debug', "removing property = " + key + " from output (NULL)");
    return undefined;
  }

  if (typeof val === 'object') {
    if (Object.keys(val).length === 0) {
      logger.log('debug', "removing property = " + key + " from output (EMPTY OBJECT)");
      return undefined;
    } else {
      if (objPropNames.indexOf(key) >= 0) {
        val = self.deleteContextProperty(val);
      }
    }
  }

  if (typeof val === 'string' && (val.length === 0 || /^\s*$/.test(val))) {
    logger.log('debug', "removing property = " + key + " from output (BLANK STRING)");
    return undefined;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) {
      logger.log('debug', "removing property = " + key + " from output (EMPTY ARRAY)");
      return undefined;
    } else {
      if (key != 'data') {
        for (var i = 0, len = val.length; i < len; i++) {
          if (typeof val[i] === 'object') {
            val[i] = self.deleteContextProperty(val[i]);
          }
        }
      }
    }
  }

  return val;
};

/**
 * Delete @context property if value corresponds to the IMS Caliper context IRI.
 * @param obj
 * @returns {*}
 */
self.deleteContextProperty = function(obj) {
  if (obj.hasOwnProperty("@context")) {
    if (ctxRegex.test(obj['@context'])) {
      delete obj['@context'];
      logger.log('debug', "removing duplicate @context property");
    }
  }
  return obj;
};

/**
 *
 * @param obj
 */
self.parseForNullsAndEmpty = function(obj) {
  return JSON.parse(JSON.stringify(obj, self.replacer));
};

/**
 *
 * @param jsObject
 */
self.serializeToJson = function(obj) {
  return JSON.stringify(obj, self.replacer);
};

module.exports = {
  serialize: self.serializeToJson,
  parseForNullsAndEmpty: self.parseForNullsAndEmpty
};
