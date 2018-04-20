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

// var logger = require('../logger');
var validator = require('../validators/validator');

var objectProperties = ["actor", "annotated", "annotator", "assignable", "assignee", "attempt", "edApp", "federatedSession",
"generated", "group", "isPartOf", "member", "membership", "object", "organization", "referrer", "replyTo", "scoredBy",
"session", "subOrganizationOf", "target", "user"];

/*
var arrayProperties = ["attachments", "creators", "extensions", "items", "keywords", "learningObjectives", "members",
"roles", "tags", "values", "withAgents"];
*/

var regexCtx = /http:\/\/purl.imsglobal.org\/ctx\/caliper\/?v?[0-9]*p?[0-9]*/;

/**
 * Represents clientUtils self.
 * @constructor clientUtils
 */
var self = this;

/**
 * Calculate the decimal number of OCTETS per RFC 2616 for HTTP header Content-Length value.
 * @param string
 * @returns {Number}
 */
self.calculateByteLength = function calculateByteLength(obj) {
  return Buffer.byteLength(obj);
};

/**
 * Delete @context property if value corresponds to the IMS Caliper context IRI.
 * @param obj
 * @returns {*}
 */
self.deleteContext = function deleteContext(obj) {
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
self.parse = function parse(obj) {
  // if (validator.checkObjectType(obj) === '[object, Object]') { // Error: SyntaxError: Unexpected token o in JSON at position 1
  if (typeof obj === "object") {
    return JSON.parse(self.stringify(obj));
  } else {
    return JSON.parse(obj);
  }
};

/**
 * Serializer replacer function that removes properties with values that are either null or empty or
 * represent a duplicate Caliper @context property.  Note that the Envelope.data array may contain
 * one or more events or describes (i.e., entities).  In such cases, @context property filtering is
 * applied only to the object properties of each event or entity comprising the array.
 * @param key
 * @param val
 * @returns {*}
 */
self.replacer = function replacer(key, val) {
  if (val === null) {
    // logger.log("debug", "".concat("REMOVED ", key, " IS NULL"));
    return undefined;
  }

  if (validator.checkObjectType(val) === '[object Object]') {
    if (Object.keys(val).length === 0) {
      // logger.log("debug", "".concat("REMOVED ", key, " IS EMPTY"));
      return undefined;
    } else {
      if (objectProperties.indexOf(key) >= 0) {
        val = self.deleteContext(val);
      }
    }
  }

  if (validator.checkObjectType(val) === '[object String]') {
    if (val.length === 0 || /^\s*$/.test(val)) {
      // logger.log("debug", "".concat("REMOVED ", key, " IS BLANK"));
      return undefined;
    }
  }

  if (validator.checkObjectType(val) === '[object Array]') {
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
 * Convert an object to a JSON string after first flattening it and then subjecting to a replacer filter.
 * @param obj
 */
self.stringify = function stringify(obj) {
  return JSON.stringify(obj, self.replacer);
};

module.exports = {
  calculateByteLength: self.calculateByteLength,
  parse: self.parse,
  stringify: self.stringify
};