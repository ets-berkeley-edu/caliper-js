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
var moment = require('moment');
var uuid = require('node-uuid');
var urijs = require('uri-js');
var validator = require('validator');
var config = require('../config/config');
var entityType = require('../entities/entityType');
var eventType = require('../events/eventType');

/**
 * Check Javascript object type.
 * @param opts
 * @returns {*}
 */
var checkObjectType = module.exports.checkObjectType = function checkObjectType(opts) {
  return Object.prototype.toString.call(opts);
};

/**
 * Generate a RFC 4122 v1 timestamp-based UUID or a v4 "practically random" UUID.  Default is v4.
 * @returns {*}
 */
module.exports.generateUUID = function generateUUID(version) {
  version = version || config.uuidVersion;

  switch(version) {
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

/**
 * Check if object has JSON-LD @context property
 * @param opts
 * @returns {boolean}
 */
module.exports.hasCaliperContext = function hasCaliperContext(opts) {
  const regex = /http:\/\/purl.imsglobal.org\/ctx\/caliper\/?v?[0-9]*p?[0-9]*/;
  var hasCaliperContext = false;

  if (opts.hasOwnProperty('@context')) {
    switch(checkObjectType(opts['@context'])) {
      case '[object String]':
        hasCaliperContext = regex.test(opts['@context']);
        break;
      case '[object Array]':
        for (var i = 0, len = opts['@context'].length; i < len; i++) {
          if (checkObjectType(opts['@context'][i]) === '[object String]') {
            if (regex.text(opts['@context'][i])) {
              hasCaliperContext = true;
              break;
            }
          }
        }
        break;
      case '[object Object]':
        if (opts['@context'].hasOwnProperty('@vocab')) {
          hasCaliperContext = regex.test(opts['@context']['@vocab']);
        }

        if (hasCaliperContext) {
          break;
        }

        if (opts['@context'].hasOwnProperty('@base')) {
          hasCaliperContext = regex.test(opts['@context']['@base']);
        }
        break;
    }
  }

  return hasCaliperContext;
};

/**
 * Check for JSON-LD context
 * @returns {boolean}
 */
module.exports.hasContext = function hasContext() {
  return !_.isNil(opts["@context"]);
};

/**
 * Check if id is undefined, null or empty.  Given that nearly any string could constitute a URI
 * @param opts
 * @returns {boolean}
 */
module.exports.hasId = function hasId(opts) {
  return !(_.isNil(opts.id) && _.isEmpty(opts.id));
};

/**
 * Check if type is undefined, null or empty.
 * @param opts
 * @returns {boolean}
 */
module.exports.hasType = function hasType(opts) {
  return !(_.isNil(opts.type) && _.isEmpty(opts.type));
};

/**
 * Check actor
 * @param opts
 */
module.exports.hasActor = function hasActor(opts) {
  return !_.isNil(opts.actor);
};

/**
 * Check action
 * @param opts
 * @returns {boolean}
 */
module.exports.hasAction = function hasAction(opts) {
  // TODO lookup action based on event
  return !(_.isNil(opts.action) && _.isEmpty(opts.action));
};

/**
 * Check object
 * @param opts
 * @returns {boolean}
 */
module.exports.hasObject = function hasObject(opts) {
  return !_.isNil(opts.object);
};

/**
 * Check if eventTime is null, undefined or invalid.
 * @param opts
 * @returns {boolean|*}
 */
module.exports.hasEventTime = function hasEventTime(opts) {
  var hasDateTime = false;
  if (!(_.isNil(opts.eventTime) && _.isEmpty(opts.eventTime))) {
    if (moment.isMoment(opts.eventTime)) {
      hasDateTime = true;
    } else {
      hasDateTime = moment(opts.eventTime).isValid();
      //hasDateTime = isISO8601(opts.eventTime);
    }
  }
  return hasDateTime;
};

/**
 * Check if String can be parsed as a URI
 * @type {exports.hasURI}
 */
var hasUri = module.exports.hasUri = function hasUri(opts) {
  if (!(_.isNil(opts.id))) {
    var uri = urijs.parse(opts.id);

    // If an error key is appended to the object return false
    if (!(_.isNil(uri.error))) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

/**
 * Check if string is a UUID URN.
 * @type {exports.isUri}
 */
var hasUuidUrn = module.exports.hasUuidUrn = function hasUuidUrn(opts) {
  if (!(_.isNil(opts.id))) {
    var uri = urijs.parse(opts.id);
    return uri.scheme === "urn:uuid" && isUuid(uri.path) ? true : false;
  } else {
    return false;
  }
};

/**
 * Check if date string is ISO 8601 compliant.
 * @param str
 * @returns {*}
 */
var isISO8601 = module.exports.isISO8601 = function isISO8601(str) {
  return validator.isISO8601(str);
};

/**
 * Check if string is a blank node.
 * @type {exports.isBlankNode}
 */
var isBlankNode = module.exports.isBlankNode = function isBlankNode(opts) {
  if (!(_.isNil(opts.id))) {
    return _.startsWith("_:") ? true : false;
  } else {
    return false;
  }
};

/**
 * Validate UUID value. validator.isUUID(str [, version]) - check if the string is a UUID (version 3, 4 or 5).
 * @param uuid
 * @returns {*}
 */
var isUuid = module.exports.isUuid = function isUuid(uuid) {
  return validator.isUUID(uuid);
};

/**
 * Check for top-level user-defined custom Entity properties against linked proto own and inherited
 * enumerable property keys (using _.keysIn()) and move custom properties to Entity.extensions. Use the
 * good 'ole for loop in preference to the for..in loop in order to avoid iterating over both enumerable
 * and inherited properties of the opts object.
 * @param proto
 * @param opts
 * @returns {*}
 */
module.exports.moveToExtensions = function moveToExtensions(proto, opts) {
  var protoKeys = _.keysIn(proto);
  var optsKeys = _.keys(opts);
  var opts = {};

  for (var i = 0, len = optsKeys.length; i < len; i++) {
    var optsPropName = optsKeys[i];
    if (protoKeys.indexOf(optsPropName) == -1) {
      var customProp = opts[optsPropName];
      var customKeys = _.keys(customProp);
      for (var i = 0, len = customKeys.length; i < len; i++) {
        if (customKeys[i] == '@context') {
          if (typeof customProp['@context'] === 'object') {
            if (opts.hasOwnProperty('@context')) {
              opts['@context'] = _.assign({}, opts['@context'], customProp['@context']);
            } else {
              opts['@context'] = customProp['@context'];
            }
          }
        } else {
          opts[customKeys[i]] = customProp[customKeys[i]];
        }
        delete opts[optsPropName];
      }
    }
  }

  if (opts.hasOwnProperty("extensions")) {
    opts.extensions = _.assign({}, opts.extensions, opts);
  } else {
    opts.extensions = opts;
  }

  return opts;
};