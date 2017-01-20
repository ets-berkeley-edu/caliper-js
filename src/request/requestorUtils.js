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

// var logger = require("../logger");

var objPropNames = [ "actor", "annotated", "assignable", "attempt", "edApp", "federatedSession", "generated",
  "group", "isPartOf", "learningObjectives", "member", "membership", "object", "organization", "referrer",
  "replyTo", "scoredBy", "session", "subOrganizationOf", "target", "withAgents" ];

var regexCtx = /http:\/\/purl.imsglobal.org\/ctx\/caliper/;

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
    // logger.log("debug", "".concat("REMOVED ", key, " IS NULL"));
    return undefined;
  }

  if (typeof val === "object") {
    if (Object.keys(val).length === 0) {
      // logger.log("debug", "".concat("REMOVED ", key, " IS EMPTY"));
      return undefined;
    } else {
      if (objPropNames.indexOf(key) >= 0) {
        val = self.deleteContext(val);
      }
    }
  }

  if (typeof val === "string" && (val.length === 0 || /^\s*$/.test(val))) {
    // logger.log("debug", "".concat("REMOVED ", key, " IS BLANK"));
    return undefined;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) {
      // logger.log("debug", "".concat("REMOVED ", key, " IS EMPTY"));
      return undefined;
    } else {
      if (key != "data") {
        for (var i = 0, len = val.length; i < len; i++) {
          if (typeof val[i] === "object") {
            val[i] = self.deleteContext(val[i]);
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
self.deleteContext = function(obj) {
  if (obj.hasOwnProperty("@context")) {
    if (regexCtx.test(obj["@context"])) {
      delete obj["@context"];
    }
  }
  return obj;
};

/**
 * Convert a JSON string to an object.
 * @param obj
 */
self.parse = function(obj) {
  if (typeof obj === "object") {
    return JSON.parse(self.stringify(obj));
  } else {
    return JSON.parse(obj);
  }
};

/**
 * Convert an object to a JSON string after first flattening it and then subjecting to a replacer filter.
 * @param obj
 */
self.stringify = function(obj) {
  return JSON.stringify(obj, self.replacer);
};

module.exports = {
  parse: self.parse,
  stringify: self.stringify
};
